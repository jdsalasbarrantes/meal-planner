import { BaseEntity, CreateDateColumn } from 'typeorm';

export class CustomBaseEntity extends BaseEntity {
    @CreateDateColumn()
    createdAt: Date;
}
