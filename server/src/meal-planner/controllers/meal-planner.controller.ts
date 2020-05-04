import { Controller, Get, Put, Param, ParseIntPipe, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MealPlanner } from "../entities/meal-planner.entity";
import { MealPlannerService } from "../services/meal-planner.service";
import { UpdateMealPlannerDto } from "../dtos/update-meal-planner.dto";
import { ProductSummaryDto } from "../dtos/product-summary.dto";

@Controller('users/:userId/meal-planner')
@UseGuards(AuthGuard())
export class MealPlannerController {

    constructor(private mealPlannerService: MealPlannerService) {}

    @Get()
    getMealPlannerByUser(@Param('userId', ParseIntPipe) userId: number): Promise<MealPlanner> {
        return this.mealPlannerService.getMealPlannerByUser(userId);
    }

    @Get('/products-summary')
    getProductsSummary(@Param('userId', ParseIntPipe) userId: number): Promise<ProductSummaryDto[]> {
        return this.mealPlannerService.getProductsSummary(userId);
    }

    @Put()
    updateMealPlanner(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateMealPlannerDto: UpdateMealPlannerDto): Promise<MealPlanner> {
        return this.mealPlannerService.updateMealPlanner(userId, updateMealPlannerDto);
    }

}
