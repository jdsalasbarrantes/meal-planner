import api from '../config/axios/axios-instance';
import { AxiosResponse } from 'axios';
import Recipe from '../models/recipe.model';

class RecipesService {
    static async getAllRecipes(): Promise<Recipe[]> {
        try {
            const response: AxiosResponse = await api.get(`/recipes`);
            return response.data;
        } catch (err) {
            return [];
        }
    }

    static async getRecipeById(id: number): Promise<Recipe | null> {
        try {
            const response: AxiosResponse = await api.get(`/recipes/${id}`);
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async addRecipe(recipe: Recipe): Promise<Recipe | null> {
        try {
            const response: AxiosResponse = await api.post('/recipes', recipe);
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async updateRecipe(recipe: Recipe): Promise<Recipe | null> {
        try {
            const response: AxiosResponse = await api.put(
                `/recipes/${recipe.id}`,
                recipe,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async deleteRecipe(id: number): Promise<boolean> {
        try {
            const response: AxiosResponse = await api.delete(`/recipes/${id}`);
            return response.status === 200;
        } catch (err) {
            return false;
        }
    }
}

export default RecipesService;
