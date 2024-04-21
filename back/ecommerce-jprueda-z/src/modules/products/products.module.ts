import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Category } from "src/entities/Category.entity";
import { Order } from "src/entities/Order.entity";


@Module ({
    imports: [
        TypeOrmModule.forFeature([Product, Category,Order]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsRepository]
})
export class ProductsModule {}