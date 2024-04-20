import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";
import * as data from '../../utils/data.json';
import { Category } from 'src/entities/Category.entity';
import { CreateProductDto } from "src/dtos/CreateProductDto.dto";

@Injectable()
export class ProductsRepository { 
    constructor( @InjectRepository(Product)private productsRepository: Repository<Product>,
  @InjectRepository(Category) private categoryRepository: Repository<Category> ) {}
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
   async getProductById(id: string) {
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
  async updateProductById(id: string, product: Product) {
    if(id !== product.id) {
      throw new NotFoundException(`Product with ID: ${id} not found`);
    } else if(id !== 'string') {
      throw new BadRequestException(`Error in ID: ${id}`);
    }
   await this.productsRepository.update(id, product);
   const updatedProduct = await this.productsRepository.findOneBy({id});
   return updatedProduct;
  }
  async deleteProductById(id: string) {
    const deleteProduct =this.productsRepository.delete(id);
    return deleteProduct;
}
async reset(): Promise<void> {
  const [categories, products] = await Promise.all([
    this.categoryRepository.find(),
    this.productsRepository.find(),
  ]);

  const deleteProduct = products.map((product) => this.productsRepository.delete(product));
  const deleteCategory = categories.map((category) => this.categoryRepository.delete(category));
  

  await Promise.all([...deleteProduct,...deleteCategory,]);

  console.log('Data reset successfully');
}
}