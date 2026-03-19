// create-task.dto.ts
import { IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber } from "class-validator";
import { TaskStatus } from "../task.entity";

export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
    
    @IsOptional()
    technologies: string[];

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsDateString()
    @IsOptional()
    doneAt?: string;

    @IsOptional()
    userId?: number; // Необов'язкове посилання на користувача
}