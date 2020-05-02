import Ingredient from './ingredient.model';

export default interface Recipe {
    id: number;
    name: string;
    description?: string;
    resources?: string;
    preparationTime?: number;
    ingredients?: Ingredient[];
}
