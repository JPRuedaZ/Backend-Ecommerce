import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import { ProductsService } from "./products.service";
import Products from "src/helpers/products";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
@Get()
getProducts(@Query('page') page=1, @Query('limit') limit=5) {
    return this.productsService.getProducts(Number(page), Number( limit));
}

@Get(':id')
getProductbyId(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
}

@Post()
@UseGuards(AuthGuard)
createProduct(@Body() product: Products) {
    return this.productsService.createProduct(product);
}

@Put(":id")
@UseGuards(AuthGuard)
updateProduct(@Param('id') id: string, @Body() product: Products) {
return this.productsService.updateProductById(Number(id), product);
}
@Delete(':id')
@UseGuards(AuthGuard)
deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProductById(Number(id));
}
}

