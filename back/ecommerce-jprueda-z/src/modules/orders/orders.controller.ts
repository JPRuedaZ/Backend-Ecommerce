import { Body, Controller, Get, ParseUUIDPipe, Post, Query, UseGuards} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "src/dtos/CreateOrderDto.dto";
import { AuthGuard } from "src/guards/auth.guard";




@Controller('orders')
export class OrdersController {
constructor(private readonly ordersService: OrdersService ) {}

@Post()
@UseGuards(AuthGuard)
createOrder(@Body() order: CreateOrderDto) {
    const {userId, products} = order
    return this.ordersService.createOrder(userId, products)
}

@Get(':id')
@UseGuards(AuthGuard)
getOrder(@Query('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id)
}
}