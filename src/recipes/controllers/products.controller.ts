import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
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

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Delete('/:id')
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productsService.deleteProduct(id);
    }
}
