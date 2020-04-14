import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductRepository } from './repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { RecipeRepository } from './repositories/recipe.repository';
import { IngredientRepository } from './repositories/ingredient.repository';
import { IngredientsController } from './controllers/ingredients.controller';
import { IngredientsService } from './services/ingredients.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductRepository,
            RecipeRepository,
            IngredientRepository,
        ]),
        UsersModule,
    ],
    controllers: [ProductsController, RecipesController, IngredientsController],
    providers: [ProductsService, RecipesService, IngredientsService],
})
export class RecipesModule {}
