import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
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
