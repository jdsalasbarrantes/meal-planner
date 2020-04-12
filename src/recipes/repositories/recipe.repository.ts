import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const recipe = new Recipe();
        recipe.name = createRecipeDto.name;
        recipe.description = createRecipeDto.description;
        recipe.resources = createRecipeDto.resources;
        recipe.preparationTime = createRecipeDto.preparationTime;
        recipe.createdAt = new Date();
        return recipe.save();
    }
}
