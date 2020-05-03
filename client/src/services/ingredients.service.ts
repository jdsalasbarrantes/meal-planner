import api from '../config/axios/axios-instance';
import { AxiosResponse } from 'axios';
import Ingredient from '../models/ingredient.model';
import Recipe from '../models/recipe.model';

class IngredientsService {
    static async addIngredient(ingredient: Ingredient): Promise<Recipe | null> {
        try {
            const response: AxiosResponse = await api.post(
                `/recipes/${ingredient.recipeId}/ingredients`,
                ingredient,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async deleteIngredient(
        ingredient: Ingredient,
    ): Promise<Recipe | null> {
        try {
            const response: AxiosResponse = await api.delete(
                `/recipes/${ingredient.recipeId}/ingredients/${ingredient.id}`,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }
}

export default IngredientsService;
