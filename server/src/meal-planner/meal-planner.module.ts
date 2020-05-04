import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlannerController } from './controllers/meal-planner.controller';
import { MealPlannerService } from './services/meal-planner.service';
import { MealPlannerRepository } from "./repositories/meal-planner.repository";
import { UsersModule } from "../users/users.module";
import { ScheduledMealRepository } from "./repositories/scheduled-meal.repository";
import { ScheduledMealService } from "./services/scheduled-meal.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            MealPlannerRepository,
            ScheduledMealRepository
        ]),
        forwardRef(() => UsersModule)
    ],
    controllers: [MealPlannerController],
    providers: [MealPlannerService, ScheduledMealService],
    exports: [MealPlannerService]
})
export class MealPlannerModule {}
