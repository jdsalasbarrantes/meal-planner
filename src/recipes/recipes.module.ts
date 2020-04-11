import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([ProductRepository]), UsersModule],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class RecipesModule {}
