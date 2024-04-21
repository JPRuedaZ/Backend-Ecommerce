import { Body, Controller, Get, Param, ParseUUIDPipe, Post,UseGuards} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "src/dtos/CreateOrderDto.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";




@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
constructor(private readonly ordersService: OrdersService ) {}

@ApiBearerAuth()
@Post()
@UseGuards(AuthGuard)
createOrder(@Body() order: CreateOrderDto) {
    const {userId, products} = order
    return this.ordersService.createOrder(userId, products)
}

@ApiBearerAuth()
@Get(':id')
@UseGuards(AuthGuard)
getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id)
}
}