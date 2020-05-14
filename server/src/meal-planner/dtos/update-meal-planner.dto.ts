import { IsNumber, IsArray, Min, IsIn } from 'class-validator';
import { WeekDays } from "../enums/week-days.enum";

export class UpdateMealPlannerDto {
    @IsNumber()
    @Min(0)
    position: number;

    @IsIn(Object.values(WeekDays))
    day: string;

    @IsArray()
    recipeIds: number[];

}
