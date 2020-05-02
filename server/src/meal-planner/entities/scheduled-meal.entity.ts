import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MealPlanner } from "./meal-planner.entity";
import { Recipe } from "../../recipes/entities/recipe.entity";

@Entity()
export class ScheduledMeal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: string;

    @Column()
    position: number;

    @Column({ nullable: true })
    customMeal: string;


    @ManyToOne(
        () => MealPlanner,
        weekPlanner => weekPlanner.scheduledMeals,
        { onDelete: 'CASCADE' },
    )
    mealPlanner: MealPlanner;

    @Column()
    mealPlannerId: number;

    @ManyToOne(
        () => Recipe,
        recipe => recipe.scheduledMeals
    )
    recipe: Recipe;

    @Column({ nullable: true })
    recipeId: number;
}
