import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/entities/Order.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { OrderDetail } from "src/entities/OrderDetail.entity";
import { User } from "src/entities/User.entity";
import { Product } from "src/entities/Product.entity";




@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}