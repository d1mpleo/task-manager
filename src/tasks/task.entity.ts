// task.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';

export enum TaskStatus {
  URGENT = 'urgent',           // Термінові задачі
  FUTURE = 'future',           // Майбутні задачі
  PENDING_APPROVAL = 'pending_approval', // Очікують схвалення
  DONE = 'done'
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column('simple-array', { nullable: true })
  technologies: string[];

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING_APPROVAL
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date; 

  @Column({ type: 'timestamp', nullable: true })
  doneAt: Date; 
}