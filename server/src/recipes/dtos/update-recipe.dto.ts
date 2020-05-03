import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
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
