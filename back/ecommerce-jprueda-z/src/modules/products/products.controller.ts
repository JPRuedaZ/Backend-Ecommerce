import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Product } from "src/entities/Product";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
@Get()
getProducts(@Query('page') page=1, @Query('limit') limit=5) {
    return this.productsService.getProducts(Number(page), Number( limit));
}

@Get('seeder')
addProducts() {
    return this.productsService.createProduct();
}

@Get(':id')
getProductbyId(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
}

@Post()
@UseGuards(AuthGuard)
createProduct(@Body() product: Product) {
    return this.productsService.createProduct();
}

@Put(":id")
@UseGuards(AuthGuard)
updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Product) {
return this.productsService.updateProductById(id, product);
}
@Delete(':id')
@UseGuards(AuthGuard)
deleteProduct(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.deleteProductById(id);
}
}

