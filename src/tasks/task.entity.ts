import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    
    @IsNotEmpty()
    @Column()
    title: string;

    @Column()
    description: string;

    @Column("text", { array: true })
    technologies: string[];

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date;

    @ManyToOne(_type => User, user => user.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}