import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { RecipeRepository } from './repositories/recipe.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository, RecipeRepository]),
        UsersModule,
    ],
    controllers: [ProductsController, RecipesController],
    providers: [ProductsService, RecipesService],
})
export class RecipesModule {}
