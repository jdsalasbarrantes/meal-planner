import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Recipe extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    resources: string;

    @Column({ nullable: true })
    preparationTime: number;

    @Column({ default: 0})
    cost: number;

    @OneToMany(
        () => Ingredient,
        ingredient => ingredient.recipe,
        { eager: true, cascade: true }
    )
    ingredients: Ingredient[];
}
