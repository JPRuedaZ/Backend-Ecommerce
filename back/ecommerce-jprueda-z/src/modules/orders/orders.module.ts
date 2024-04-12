import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/Order";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderDetail } from "src/entities/OrderDetail";
import { User } from "src/entities/User";
import { Product } from "src/entities/Product";




@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}