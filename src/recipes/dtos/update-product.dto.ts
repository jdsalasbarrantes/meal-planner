import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    price: number;
}
