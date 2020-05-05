import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ScheduledMeal } from "./scheduled-meal.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class MealPlanner extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => ScheduledMeal,
        scheduledMeal => scheduledMeal.mealPlanner,
        { cascade: true}
    )
    scheduledMeals: ScheduledMeal[];

    @OneToOne(() => User, { onDelete: 'CASCADE'})
    user: User;

    @Column()
    userId: number;
}
