import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from "../dtos/update-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.createProduct(createProductDto);
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.find({});
    }

    async getProductById(id: number): Promise<Product> {
        const found = await this.productRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return found;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.getProductById(id);
        product.name = updateProductDto.name;
        product.unitScale = updateProductDto.unitScale;
        product.unitQuantity = updateProductDto.unitQuantity;
        product.price = updateProductDto.price;
        return product.save();
    }

    async deleteProduct(id: number): Promise<void> {
        const { affected } = await this.productRepository.delete(id);
        if (affected === 0) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
    }
}
