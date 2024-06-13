import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Not, Repository } from "typeorm";
import * as data from '../../utils/data.json';
import { Category } from 'src/entities/Category.entity';
import { CreateProductDto } from "src/dtos/CreateProductDto.dto";
import { Order } from "src/entities/Order.entity";

@Injectable()
export class ProductsRepository { 
    constructor( @InjectRepository(Product)private productsRepository: Repository<Product>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
@InjectRepository(Order) private orderRepository: Repository<Order>) {}
async getTotalProducts(): Promise<number> {
  const total = await this.productsRepository.count({
    where: {
      stock: Not(0)  // Filtrar productos con stock diferente de cero
    }
  });
  return total;
}
    async getproductsRepository(page: number,limit: number): Promise<Product[]> {
      let products = await this.productsRepository.find({
        relations: {
          category: true,
        },
      });
      products = products.filter((product) => product.stock !== 0);
      const init = (page - 1) * limit;
      const end = init + limit;
      products = products.slice(init, end);
      return products
    }
   async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({id});
    if(!product || product.stock === 0) throw new NotFoundException('Product not available');
     return product;
  }
  async addProducts(): Promise<string> {
    const categories = await this.categoryRepository.find();

    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const product = new Product();
      product.name = element.name;
      product.price = element.price;
      product.description = element.description;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orUpdate(['description', 'imgUrl', 'stock', 'price'], ['name'])
        .execute();
    });

    return 'Preloaded products';
  }
  async createProduct(product: CreateProductDto) : Promise<Product> {
    const { category, ...productData } = product;

    const existingProduct = await this.productsRepository.findOneBy({
      name: productData.name,
    });
    if (existingProduct) {
      throw new BadRequestException("Product already exists");
    }

    const existingCategory = await this.categoryRepository.findOneBy({
      name: category,
    });

    if (!existingCategory) {
      throw new BadRequestException("Category does not exist");
    }

    const newProduct = this.productsRepository.create({
      ...productData,
      category: existingCategory,
    });
    await this.productsRepository.save(newProduct);

    return newProduct;

  }
  async updateProductById(id: string, product: Partial<Product>) : Promise<Product> {
    const foundProduct = await this.productsRepository.findOneBy({id});
    if(!foundProduct) throw new NotFoundException('Product not found');
   await this.productsRepository.update(id, {...product});
   const updatedProduct = await this.productsRepository.findOneBy({id});
   return updatedProduct;
  }
  async deleteProductById(id: string): Promise<string>  {
    await this.productsRepository.delete({ id: id });
    return `Deleted product with ID: ${id}`;
}
async reset(): Promise<void> {
  const products = await this.productsRepository.find();
  const categories = await this.categoryRepository.find();
  const orders = await this.orderRepository.find();


  if(orders.length > 0) {
   throw new ConflictException('Cannot reset data. Orders exist');
  }

  products.map(async (product) => await this.productsRepository.remove(product)),
  categories.map(async (category) => await this.categoryRepository.remove(category))
 
  

  
}
}