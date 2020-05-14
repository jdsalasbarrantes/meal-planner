import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Product extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unitQuantity: number;

    @Column()
    unitScale: string;

    @Column({ default: 0})
    price: number;

    @OneToMany(
        () => Ingredient,
        ingredient => ingredient.product,
    )
    public ingredients: Ingredient[];
}
