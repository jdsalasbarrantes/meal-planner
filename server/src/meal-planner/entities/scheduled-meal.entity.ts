import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, RelationId } from 'typeorm';
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

    @ManyToOne(
        () => MealPlanner,
        weekPlanner => weekPlanner.scheduledMeals,
        { onDelete: 'CASCADE' },
    )
    mealPlanner: MealPlanner;

    @Column()
    mealPlannerId: number;

    @ManyToMany(() => Recipe, { cascade: true})
    @JoinTable()
    recipes: Recipe[];

    @RelationId((scheduledMeal: ScheduledMeal) => scheduledMeal.recipes)
    recipeIds: number[];
}
