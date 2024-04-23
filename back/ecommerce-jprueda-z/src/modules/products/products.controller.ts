import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Product } from "src/entities/Product.entity";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/utils/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "src/dtos/CreateProductDto.dto";

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
@Get()
getProducts(@Query('page') page:number=1, @Query('limit') limit:number=5): Promise <Product[]> {
    return this.productsService.getProducts(Number(page), Number( limit));
}

@Get('seeder')
addProducts(): Promise<string> {
    return this.productsService.addProducts();
}

@Get(':id')
getProductbyId(@Param('id', ParseUUIDPipe) id: string): Promise <Product> {
    return this.productsService.getProductById(id);
}

@ApiBearerAuth()
@Post()
@Roles(Role.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
createProduct(@Body() product: CreateProductDto): Promise <Product> {
    return this.productsService.createProduct(product);
}

@ApiBearerAuth()
@Put(":id")
@Roles(Role.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<Product>): Promise <Partial<Product>> {
return this.productsService.updateProductById(id, product);
}

@ApiBearerAuth()
@Delete(':id')
@Roles(Role.ADMIN)
@UseGuards(AuthGuard,RolesGuard)
deleteProduct(@Param('id',ParseUUIDPipe) id: string): Promise <string> {
    return this.productsService.deleteProductById(id);
}
}

