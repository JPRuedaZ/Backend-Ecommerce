import { Body, Controller, Get, Post, Query} from "@nestjs/common";
import { OrdersService } from "./orders.service";




@Controller('orders')
export class OrdersController {
constructor(private readonly ordersService: OrdersService ) {}

@Post()
createOrder(@Body() order: any) {
    const {userId, products} = order
    return this.ordersService.createOrder(userId, products)
}

@Get(':id')
getOrder(@Query('id') id: string) {
    return this.ordersService.getOrders(id)
}
}