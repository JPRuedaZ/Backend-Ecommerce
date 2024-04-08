import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import Products from "src/helpers/products";

@Injectable()
export class ProductsService {
    
    constructor(private readonly productsRepository: ProductsRepository) {}
    getProducts(page,limit) {
        return this.productsRepository.getProducts(page, limit);
    }
    getProductById(id: number) {
        return this.productsRepository.getProductById(id);
    }
    createProduct(product: Omit<Products, 'id'>) {
        return this.productsRepository.createProduct(product);
    }
    updateProductById(id: number, product: Products) {
        return this.productsRepository.updateProductById(id, product);
    }
    deleteProductById(id: number) {
        return this.productsRepository.deleteProductById(id);
    }
}