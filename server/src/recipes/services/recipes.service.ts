import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { UpdateRecipeDto } from "../dtos/update-recipe.dto";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepository: RecipeRepository,
    ) {}

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeRepository.createRecipe(createRecipeDto);
    }

    async getAllRecipes(): Promise<Recipe[]> {
        return this.recipeRepository.find({});
    }

    async getRecipeById(id: number): Promise<Recipe> {
        const found = await this.recipeRepository.findOne(id, { relations: ["ingredients"]});
        if (!found) {
            throw new NotFoundException(`Recipe with id ${id} not found`);
        }
        return found;
    }

    async updateRecipe(id: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        const recipe = await this.getRecipeById(id);
        recipe.name = updateRecipeDto.name;
        recipe.description = updateRecipeDto.description;
        recipe.resources= updateRecipeDto.resources;
        recipe.preparationTime = updateRecipeDto.preparationTime;
        return recipe.save();
    }

    async deleteRecipe(id: number): Promise<void> {
        const { affected } = await this.recipeRepository.delete(id);
        if (affected === 0) {
            throw new NotFoundException(`Recipe with id ${id} not found`);
        }
    }


}
