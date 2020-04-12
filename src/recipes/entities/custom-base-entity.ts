import { BaseEntity, Column } from 'typeorm';

export class CustomBaseEntity extends BaseEntity {
    @Column({ nullable: true })
    createdAt: Date;
}
