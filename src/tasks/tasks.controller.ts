// tasks.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { TaskStatus } from './task.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDTO, @Req() req) {
    return this.tasksService.create(createTaskDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.id);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: TaskStatus, @Req() req) {
    return this.tasksService.findByStatus(req.user.id, status);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: TaskStatus) {
    return this.tasksService.updateStatus(id, status);
  }
}