import { EntityRepository, Repository } from 'typeorm';
import { ScheduledMeal } from "../entities/scheduled-meal.entity";

@EntityRepository(ScheduledMeal)
export class ScheduledMealRepository extends Repository<ScheduledMeal> { }
