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
    async getProducts() {
        return this.products
    }
}