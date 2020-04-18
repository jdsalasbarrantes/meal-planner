import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateRecipeDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    resources: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    preparationTime: number;
}
