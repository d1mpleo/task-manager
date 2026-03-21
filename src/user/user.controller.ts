import { Body, Controller, Post, Req } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { UserService } from './user.service';
import { AddSubordinateDto } from './dto/add-subordinate.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/addSubordinate")
    create(@Req() req, @Body() addSubordinateDto: AddSubordinateDto) {
        return this.userService.addSubordinate(req.user.id, addSubordinateDto);
    }
}
