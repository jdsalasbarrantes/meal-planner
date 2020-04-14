import { EntityRepository, Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { CreateIngredientDto } from '../dtos/create-ingredient.dto';

@EntityRepository(Ingredient)
export class IngredientRepository extends Repository<Ingredient> {
    async createIngredient(
        createIngredientDto: CreateIngredientDto,
    ): Promise<Ingredient> {
        const ingredient = new Ingredient();
        ingredient.recipeId = createIngredientDto.recipeId;
        ingredient.productId = createIngredientDto.productId;
        ingredient.quantity = createIngredientDto.quantity;
        return ingredient.save();
    }
}
