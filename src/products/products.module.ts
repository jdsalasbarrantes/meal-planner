import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository]),
        AuthModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
