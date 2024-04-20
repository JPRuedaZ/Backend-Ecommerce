import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "src/entities/Product.entity";
import { CreateProductDto } from "src/dtos/CreateProductDto.dto";


@Injectable()
export class ProductsService {
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts(page: number,limit: number): Promise<Product[]> {
        return this.productsRepository.getproductsRepository(page, limit);
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id);
    }
    addProducts() {
        return this.productsRepository.addProducts();
    }
    createProduct(product: CreateProductDto) : Promise<Product> {
        return this.productsRepository.createProduct(product);
    }
    updateProductById(id: string, product: Product) {
        return this.productsRepository.updateProductById(id, product);
    }
    deleteProductById(id: string) {
        return this.productsRepository.deleteProductById(id);
    }
}