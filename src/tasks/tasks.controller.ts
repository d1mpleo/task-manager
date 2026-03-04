import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { createTaskDTO } from './dto/create-task.dto';
import { updateV1State } from 'uuid/dist/cjs/v1';
import { GetTasksFilterDTO } from './dto/get-tasks-dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('Tasks controller');
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Getuser() user: User): Promise<Task[]>{
        this.logger.verbose(`User ${user.username} retrieving the task`)
        return this.tasksService.getAllTasks(user);
    }

    // @Get("/filter")
    // getTasksWithFilter(@Body() filter: GetTasksFilterDTO): Task[]{
    //     if(Object.keys(filter).length){
    //         console.log(1)
    //         return this.tasksService.getTasksWithFilter(filter);
    //     }else{
    //         console.log(2)
    //         return this.tasksService.getTasksWithFilter(filter);
    //     }
    // }

    @Get('/:id')
    getTaskByID(@Param('id') id: string, @Getuser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }
 
    @Post()
    createTask(@Body() createTaskDTO: createTaskDTO, @Getuser() user: User): Promise<Task>{
        this.logger.verbose(`User "${user.username}" have created task`)
        return this.tasksService.createTask(createTaskDTO, user);
    }

    @Delete()
    deleteTask(@Body() body: {id: string}): Promise<Task>{
        return this.tasksService.deleteTask(body.id);
    }

    // @Put("/:id")
    // updateTask(@Param('id') id: string, @Body() createTaskDTO: createTaskDTO) {
    //     return this.tasksService.updateTask(id, createTaskDTO);
    // }
}
