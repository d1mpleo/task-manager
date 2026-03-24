import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { UserService } from './user.service';
import { AddSubordinateDto } from './dto/add-subordinate.dto';
import { CreateApplicationDto } from './dto/application.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/addSubordinate")
    create(@Req() req, @Body() addSubordinateDto: AddSubordinateDto) {
        return this.userService.addSubordinate(req.user.id, addSubordinateDto);
    }

    @Post("/addApplication")
    addApplication(@Req() req, @Body() createApplicationDto: CreateApplicationDto) {
        return this.userService.addApplication(req.user.id, createApplicationDto);
    }

    @Get('/applications')
    getApplications(@Req() req) {
        return this.userService.getApplications(req.user.id);
    }
}
