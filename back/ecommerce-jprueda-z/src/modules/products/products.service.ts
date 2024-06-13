import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "src/entities/Product.entity";
import { CreateProductDto } from "src/dtos/CreateProductDto.dto";


@Injectable()
export class ProductsService {
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    async getProducts(page: number, limit: number): Promise<{ products: Product[], total: number }> {
        const products = await this.productsRepository.getproductsRepository(page, limit);
        const total = await this.productsRepository.getTotalProducts();
        return { products, total };
      }
    getProductById(id: string): Promise<Product> {
        return this.productsRepository.getProductById(id);
    }
    addProducts(): Promise<string> {
        return this.productsRepository.addProducts();
    }
    createProduct(product: CreateProductDto) : Promise<Product> {
        return this.productsRepository.createProduct(product);
    }
    updateProductById(id: string, product: Partial<Product>) {
        return this.productsRepository.updateProductById(id, product);
    }
    deleteProductById(id: string): Promise<string> {
        return this.productsRepository.deleteProductById(id);
    }
}