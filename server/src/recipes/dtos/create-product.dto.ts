import {
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
} from 'class-validator';
import { ProductUnitScale } from '../enums/product-unit-scale.enum';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    unitQuantity: number;

    @IsIn(Object.values(ProductUnitScale))
    unitScale: string;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    price: number;
}
