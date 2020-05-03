import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeRepository } from '../repositories/recipe.repository';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { UpdateRecipeDto } from "../dtos/update-recipe.dto";
import { ProductsService } from "./products.service";
import { CreateIngredientDto } from "../dtos/create-ingredient.dto";
import { Ingredient } from "../entities/ingredient.entity";

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepository: RecipeRepository,
        private productsService: ProductsService,
    ) {}

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeRepository.createRecipe(createRecipeDto);
    }

    async getAllRecipes(): Promise<Recipe[]> {
        return this.recipeRepository.find({});
    }

    async getRecipeById(id: number): Promise<Recipe> {
        const found = await this.recipeRepository.findOne(id);
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

    async createIngredient(recipeId: number, createIngredientDto: CreateIngredientDto): Promise<Recipe> {
        const { productId, quantity } = createIngredientDto;
        const recipe = await this.getRecipeById(recipeId);

        const ingredient = new Ingredient();
        ingredient.productId = productId;
        ingredient.quantity = quantity;
        recipe.ingredients.push(ingredient);

        recipe.cost += await this.getIngredientCost(quantity, productId);
        return recipe.save();
    }

    async deleteIngredient(recipeId: number, id: number): Promise<Recipe> {
        const recipe = await this.getRecipeById(recipeId);

        const index = recipe.ingredients.findIndex((ingredient) => ingredient.id === id);
        if (index === -1) {
            throw new NotFoundException(`Ingredient with id ${id} not found`);
        }

        const ingredient = recipe.ingredients[index];
        recipe.ingredients.splice(index, 1);
        recipe.cost -= await this.getIngredientCost(ingredient.quantity, ingredient.productId);
        await ingredient.remove();

        return recipe.save();
    }

    private async getIngredientCost(ingredientQuantity: number, productId: number): Promise<number> {
        const product = await this.productsService.getProductById(productId);
        let cost = 0;
        if (product.price && product.price > 0) {
            const unitsNeeded = Math.ceil(ingredientQuantity / product.unitQuantity);
            cost = unitsNeeded * product.price;
        }
        return cost;
    }

}
