import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

export enum PriorityEnum {
  LOW = 'baja',
  MEDIUM = 'media',
  HIGH = 'alta',
}

@Entity('to_do')
export class ToDo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({
        type: 'enum',
        enum: PriorityEnum,
        default: PriorityEnum.MEDIUM,
    })
    priority: PriorityEnum;

    @Column({ name: 'is_completed', type: 'boolean', default: false })
    isCompleted: boolean;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @ManyToOne(() => User, (user) => user.toDos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}