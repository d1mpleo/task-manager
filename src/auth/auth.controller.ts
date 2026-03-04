import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserDTO } from './dto/UserDTO';
import { signInDTO } from './dto/SignInDTO';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post()
    signUp(@Body() userDTO: UserDTO): Promise<User> {
        return this.AuthService.signUp(userDTO);
    }
    
    @Post('/signIn')
    signIn(@Body() signInDTO: signInDTO): Promise<{accessToken: string}> {
        return this.AuthService.signIn(signInDTO);
    }

}
