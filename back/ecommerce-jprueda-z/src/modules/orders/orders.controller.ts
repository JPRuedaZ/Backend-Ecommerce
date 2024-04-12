import { Body, Controller, Get, ParseUUIDPipe, Post, Query} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "src/dtos/CreateOrderDto.dto";




@Controller('orders')
export class OrdersController {
constructor(private readonly ordersService: OrdersService ) {}

@Post()
createOrder(@Body() order: CreateOrderDto) {
    const {userId, products} = order
    return this.ordersService.createOrder(userId, products)
}

@Get(':id')
getOrder(@Query('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id)
}
}