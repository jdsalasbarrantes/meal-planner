import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductsService {
    constructor(
@InjectRepository(ProductRepository) private productRepository: ProductRepository
    ) {


    }
}
