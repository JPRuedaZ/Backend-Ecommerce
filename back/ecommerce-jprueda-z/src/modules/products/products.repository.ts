import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product";
import { Repository } from "typeorm";
import * as data from '../../utils/data.json';
import { Category } from 'src/entities/Category';

@Injectable()
export class ProductsRepository { 
    constructor( @InjectRepository(Product)private productsRepository: Repository<Product>,
  @InjectRepository(Category) private categoryRepository: Repository<Category> ) {}
    async getproductsRepository(page,limit) {
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
    if(!product || product.stock === 0) throw new Error('Product not found');
     return product;
  }
  async createProduct() {
    const categories = await this.categoryRepository.find();
    data?.map(async (elem) => {
      const category = categories.find(
        (category)  => category.name === elem.category 
      );
      const product = new Product();
      product.name = elem.name;
      product.description = elem.description;
      product.price = elem.price;
      product.stock = elem.stock;
      product.imgUrl = elem.imgUrl;
      product.category = category;

      await this.productsRepository.createQueryBuilder().insert().into(Product).values(product).orUpdate(["description", "price", "stock", "imgUrl"],["name"]).execute();
    })
    
    return 'Products added successfully';
   
  }
  async updateProductById(id: string, product: Product) {
   await this.productsRepository.update(id, product);
   const updatedProduct = await this.productsRepository.findOneBy({id});
   return updatedProduct;
  }
  async deleteProductById(id: string) {
    const deleteProduct =this.productsRepository.delete(id);
    return deleteProduct;
}
}