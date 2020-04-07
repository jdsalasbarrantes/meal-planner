import {
    Body,
    Controller,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createProduct(
        @Body() createProductDto: CreateProductDto,
    ): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }
}
