import api from '../config/axios/axios-instance';
import { AxiosResponse } from 'axios';
import MealPlanner from '../models/meal-planner.model';
import ScheduledMeal from '../models/scheduled-meal.model';

class MealPlannerService {
    static async getMealPlannerByUser(
        userId: number,
    ): Promise<MealPlanner | null> {
        try {
            const response: AxiosResponse = await api.get(
                `/users/${userId}/meal-planner`,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }

    static async updateMealPlanner(
        userId: number,
        scheduledMeal: ScheduledMeal,
    ): Promise<MealPlanner | null> {
        try {
            const response: AxiosResponse = await api.put(
                `/users/${userId}/meal-planner`,
                scheduledMeal,
            );
            return response.data;
        } catch (err) {
            return null;
        }
    }
}

export default MealPlannerService;
