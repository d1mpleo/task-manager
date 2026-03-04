import { BadRequestException, Get, Injectable, NotFoundException } from '@nestjs/common';

import { createTaskDTO } from './dto/create-task.dto';
import { create } from 'domain';
import { GetTasksFilterDTO } from './dto/get-tasks-dto';
import { NotFoundError } from 'rxjs';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { validate as isUuid } from 'uuid';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly tasksRepository: Repository<Task>
    ) {}

    
    async getAllTasks(user: User): Promise<Task[]>{
        return await this.tasksRepository.find( {where: { user: { id: user.id } }} );
    }

//     createTask(createTaskDTO: createTaskDTO): Task{
//         const { title, description, technologies } = createTaskDTO;

//         const task: Task = {
//             id: v4(),
//             title,
//             description,
//             technologies
//         };

//         this.tasks.push(task);
//         return task;
//     }

    async getTaskById(id: string, user: User): Promise<Task> {
        if(!isUuid(id)) throw new BadRequestException("id is not uuid, so id doesnt exist")
        const task = await this.tasksRepository.findOneBy({id, user: {id: user.id}});
        if(!task){
            throw new NotFoundException(`Task with ${id} is not found`);
        }
        return task;
    }

    async createTask(taskDTO: createTaskDTO, user: User): Promise<Task> {
        const {title, description, technologies} = taskDTO;

        const task = this.tasksRepository.create({
            title,
            description,
            technologies,
            user
        });

        return await this.tasksRepository.save(task);


    }

    async deleteTask(id: string): Promise<Task> {
        if(!isUuid(id)) throw new BadRequestException("id is not uuid, so id doesnt exist")
        const task = await this.tasksRepository.findOneBy({id});

        if(!task){
            throw new NotFoundException(`Task with ${id} is not found`);
        }
        await this.tasksRepository.remove(task);
        return task;
    }
    
//     getTaskByID(id: string): Task | undefined{
//         const task = this.tasks.find((task) => task.id === id);
//         if(task) return task;
//         else {
//             throw new NotFoundException();
//         }
//     }

//     deleteTask(id: string): Task[] {
//         this.tasks = this.tasks.filter((item) => item.id !== id);
//         return this.tasks;
//     }

//     updateTask(id: string, createTaskDTO: createTaskDTO): Task | undefined {
//         const task = this.tasks.find((item) => id === item.id);
//         if(task) {
//             task.description = createTaskDTO.description;
//             task.technologies = createTaskDTO.technologies;
//         }
//         return 
//     }

//     getTasksWithFilter(filter: GetTasksFilterDTO): Task[] {
//         const result = this.tasks.filter((item) =>
//   filter.technologies.every(tech => item.technologies.includes(tech))
// );
//         if(result.length) return result;
//         else throw new NotFoundException();
//     }
}
