// tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // tasks.service.ts
async create(createTaskDto: CreateTaskDTO, currentUserId: number): Promise<Task> {
    const task = this.tasksRepository.create({
        ...createTaskDto,
        userId: createTaskDto.userId || currentUserId, // Використовуємо переданий userId або поточного користувача
        status: createTaskDto.status || TaskStatus.PENDING_APPROVAL,
        createdAt: new Date(),
    });
    
    return this.tasksRepository.save(task);
}

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByStatus(userId: number, status: TaskStatus): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId, status },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    await this.tasksRepository.update(id, { status });
    
    const updatedTask = await this.tasksRepository.findOne({ 
        where: { id },
        relations: ['user'] // Add this if you need user relations
    });
    
    if (!updatedTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
    }
    
    return updatedTask;
}
}