import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Product } from "src/entities/Product";

@Injectable()
export class ProductsService {
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts(page,limit) {
        return this.productsRepository.getproductsRepository(page, limit);
    }
    getProductById(id: string) {
        return this.productsRepository.getProductById(id);
    }
    createProduct() {
        return this.productsRepository.createProduct();
    }
    updateProductById(id: string, product: Product) {
        return this.productsRepository.updateProductById(id, product);
    }
    deleteProductById(id: string) {
        return this.productsRepository.deleteProductById(id);
    }
}