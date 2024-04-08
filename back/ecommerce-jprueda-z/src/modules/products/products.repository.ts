import { Injectable } from "@nestjs/common";
import Products from "../../helpers/products";
@Injectable()
export class ProductsRepository { 
    private products : Products[] = [
        {
            id: 1,
            name: 'Camisa de algodón',
            description: 'Camisa de manga larga de algodón suave y cómoda.',
            price: 29.99,
            stock: true,
            imgUrl: 'https://example.com/camisa1.jpg',
          },
          {
            id: 2,
            name: 'Pantalones vaqueros',
            description: 'Pantalones vaqueros clásicos con un ajuste cómodo.',
            price: 39.99,
            stock: true,
            imgUrl: 'https://example.com/pantalones.jpg',
          },
          {
            id: 3,
            name: 'Zapatos deportivos',
            description: 'Zapatos deportivos ligeros y transpirables para correr.',
            price: 49.99,
            stock: false,
            imgUrl: 'https://example.com/zapatos.jpg',
          },
          {
            id: 4,
            name: 'Bolso de cuero',
            description: 'Bolso de cuero elegante y duradero con múltiples compartimentos.',
            price: 79.99,
            stock: true,
            imgUrl: 'https://example.com/bolso.jpg',
          },
          {
            id: 5,
            name: 'Reloj de pulsera',
            description: 'Reloj de pulsera analógico con correa de acero inoxidable.',
            price: 99.99,
            stock: true,
            imgUrl: 'https://example.com/reloj.jpg',
          }
    ];
    async getProducts(page,limit) {
      const init = (page - 1) * limit;
      const end = init + limit;
        return await this.products.slice(init, end);
    }
   async getProductById(id: number) {
      return this.products.find((product) => product.id === id);
  }
  async createProduct(product: Omit<Products, "id">) {
    const id = this.products.length + 1;
    this.products = [...this.products,{id,...product}];
    return {id,...product}
  }
  async updateProductById(id: number, product: Products) {
   const index = this.products.findIndex((product) => product.id === id);
   this.products[index] = {id,...product };
  }
  async deleteProductById(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    const deleteProduct =this.products.splice(index, 1);
    return deleteProduct;
}
}