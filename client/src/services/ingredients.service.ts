import api from '../config/axios/axios-instance';
import { AxiosResponse } from 'axios';
import Ingredient from '../models/ingredient.model';

class IngredientsService {
    static async addIngredient(ingredient: Ingredient): Promise<Ingredient> {
        try {
            const response: AxiosResponse = await api.post(
                `/recipes/${ingredient.recipeId}/ingredients`,
                ingredient,
            );
            return response.data;
        } catch (err) {
            return {};
        }
    }

    static async deleteIngredient(ingredient: Ingredient): Promise<boolean> {
        try {
            const response: AxiosResponse = await api.delete(
                `/recipes/${ingredient.recipeId}/ingredients/${ingredient.id}`,
            );
            return response.status === 200;
        } catch (err) {
            return false;
        }
    }
}

export default IngredientsService;
