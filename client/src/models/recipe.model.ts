import Ingredient from './ingredient.model';

export default class Recipe {
    id?: number;
    name?: string;
    description?: string;
    resources?: string;
    preparationTime?: number;
    ingredients?: Ingredient[];
}
