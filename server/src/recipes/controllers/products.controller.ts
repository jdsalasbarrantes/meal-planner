import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../entities/product.entity';
import { UpdateProductDto } from "../dtos/update-product.dto";

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto,
    ): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Put('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return this.productsService.updateProduct(id, updateProductDto);
    }

    @Delete('/:id')
    deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productsService.deleteProduct(id);
    }
}
