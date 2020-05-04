import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealPlannerRepository } from "../repositories/meal-planner.repository";
import { MealPlanner } from "../entities/meal-planner.entity";
import { WeekDays } from "../enums/week-days.enum";
import { ScheduledMeal } from "../entities/scheduled-meal.entity";
import { UpdateMealPlannerDto } from "../dtos/update-meal-planner.dto";
import { Recipe } from "../../recipes/entities/recipe.entity";
import { Product } from "../../recipes/entities/product.entity";
import { Ingredient } from "../../recipes/entities/ingredient.entity";
import { ProductSummaryDto } from "../dtos/product-summary.dto";

@Injectable()
export class MealPlannerService {
    constructor(
        @InjectRepository(MealPlannerRepository)
        private mealPlannerRepository: MealPlannerRepository,
    ) {}

    async createMealPlanner(userId: number, mealsPerDay: number = 5): Promise<MealPlanner> {
        const mealPlanner = new MealPlanner();
        mealPlanner.userId = userId;
        mealPlanner.scheduledMeals = [];
        Object.keys(WeekDays).forEach(day => {
            for (let i: number = 0; i < mealsPerDay; i++) {
                const scheduledMeal = new ScheduledMeal();
                scheduledMeal.day = WeekDays[day];
                scheduledMeal.position = i;
                mealPlanner.scheduledMeals.push(scheduledMeal);
            }
        });

        return mealPlanner.save();
    }

    async getMealPlannerByUser(userId: number): Promise<MealPlanner> {
        const found = this.mealPlannerRepository.findOne({ userId }, { relations: ['scheduledMeals']});
        if (!found) {
            throw new NotFoundException(`Meal Planner with user id ${userId} not found`);
        }
        return found;
    }

    async updateMealPlanner(userId: number, updateMealPlannerDto: UpdateMealPlannerDto): Promise<MealPlanner> {
        const mealPlanner = await this.getMealPlannerByUser(userId);
        let scheduledMealIndex = -1;
        const { day, position, recipeId, customMeal } = updateMealPlannerDto;
        for (let i = 0; i < mealPlanner.scheduledMeals.length; i ++) {
            if (mealPlanner.scheduledMeals[i].day === day && mealPlanner.scheduledMeals[i].position === position) {
                scheduledMealIndex = i;
            }
        }
        if (scheduledMealIndex === -1) {
            throw new BadRequestException('The data provided does not match with the meal planner');
        }

        mealPlanner.scheduledMeals[scheduledMealIndex].recipeId = recipeId;
        mealPlanner.scheduledMeals[scheduledMealIndex].customMeal = customMeal;

        return mealPlanner.save()
    }

    async getProductsSummary(userId: number): Promise<ProductSummaryDto[]> {
        return this.mealPlannerRepository.getProductsSummary(userId);
    }
}
