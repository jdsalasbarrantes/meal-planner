import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CustomBaseEntity } from './custom-base-entity';

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

    @Column({ nullable: true })
    price: number;
}
