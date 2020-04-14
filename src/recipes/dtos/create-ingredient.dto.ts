import { IsNumber, IsPositive } from 'class-validator';

export class CreateIngredientDto {
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    recipeId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
