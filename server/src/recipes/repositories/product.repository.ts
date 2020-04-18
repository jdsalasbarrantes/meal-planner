import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const product = new Product();
        product.name = createProductDto.name;
        product.unitQuantity = createProductDto.unitQuantity;
        product.unitScale = createProductDto.unitScale;
        product.price = createProductDto.price;
        product.createdAt = new Date();
        return product.save();
    }
}
