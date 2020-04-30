import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';
import { Recipe } from './recipe.entity';
import { Product } from './product.entity';

@Entity()
export class
Ingredient extends CustomBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(
        () => Recipe,
        recipe => recipe.ingredients,
        { onDelete: 'CASCADE' },
    )
    recipe: Recipe;

    @Column()
    recipeId: number;

    @ManyToOne(
        () => Product,
        product => product.ingredients,
    )
    product: Product;

    @Column()
    productId: number;
}
