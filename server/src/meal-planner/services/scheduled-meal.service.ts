import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MealPlannerRepository } from "../repositories/meal-planner.repository";
import { ScheduledMealRepository } from "../repositories/scheduled-meal.repository";

@Injectable()
export class ScheduledMealService {
    constructor(
        @InjectRepository(MealPlannerRepository)
        private scheduledMealRepository: ScheduledMealRepository,
    ) {


    }
}
