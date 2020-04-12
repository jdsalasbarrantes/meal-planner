import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepository: RecipeRepository,
    ) {}

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeRepository.createRecipe(createRecipeDto);
    }

    async getRecipeById(id: number): Promise<Recipe> {
        const found = await this.recipeRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Recipe with id ${id} not found`);
        }
        return found;
    }

    async deleteRecipe(id: number): Promise<void> {
        const { affected } = await this.recipeRepository.delete(id);
        if (affected === 0) {
            throw new NotFoundException(`Recipe with id ${id} not found`);
        }
    }
}
