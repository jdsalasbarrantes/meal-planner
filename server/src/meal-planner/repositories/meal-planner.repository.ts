import { EntityRepository, Repository } from 'typeorm';
import { MealPlanner } from "../entities/meal-planner.entity";

@EntityRepository(MealPlanner)
export class MealPlannerRepository extends Repository<MealPlanner> { }
