import Ingredient from './ingredient.model';

export default interface Recipe {
    id: number;
    name: string;
    cost: number;
    description?: string;
    resources?: string;
    preparationTime?: number;
    ingredients?: Ingredient[];
}
