import { User } from 'src/auth/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('applications')
export class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    company: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp' })
    appliedAt: Date;

    @Column()
    userId: string;
}