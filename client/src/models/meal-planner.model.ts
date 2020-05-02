import ScheduledMeal from './scheduled-meal.model';

export default interface MealPlanner {
    id: number;
    scheduledMeals: ScheduledMeal[];
}
