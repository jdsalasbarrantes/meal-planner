import { IsNumber, IsPositive } from 'class-validator';

export class CreateIngredientDto {
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;
}
