import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { ProductsService } from "./products.service";

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productsService: ProductsService) {}

}
