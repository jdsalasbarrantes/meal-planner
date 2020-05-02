import { IsNumber, IsPositive, IsIn, IsOptional, IsString } from 'class-validator';
import { WeekDays } from "../enums/week-days.enum";

export class UpdateMealPlannerDto {
    @IsNumber()
    @IsPositive()
    position: number;

    @IsIn(Object.values(WeekDays))
    day: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    recipeId: number;

    @IsString()
    @IsOptional()
    customMeal: string;

}
