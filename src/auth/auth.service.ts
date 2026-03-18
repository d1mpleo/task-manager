import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/UserDTO';
import * as bcrypt from 'bcrypt'
import { signInDTO } from './dto/SignInDTO';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async signUp(userDTO: UserDTO): Promise<User>{
        const { username, email, password, description } = userDTO;

        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(password, salt);

        const found = await this.UserRepository.findOneBy({username});
        if(found){
            throw new BadRequestException("User with this username exists already");
        }
        const user = this.UserRepository.create({
            username,
            email,
            password: password_hash,
            description
        })
        await this.UserRepository.save(user);
        return user;
    }

    async signIn(signInDTO: signInDTO): Promise< {accessToken: string} >{
        const { email, password } = signInDTO;

        const user = await this.UserRepository.findOneBy({ email });

        if(!user) throw new BadRequestException("Username not found");

        if(await bcrypt.compare(password, user.password)){
            const payload = {
    sub: user.id,           // унікальний ідентифікатор
    email: user.email,      // email для комунікації
    username: user.username // ім'я для відображення
  };

            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }else{
            throw new UnauthorizedException("Check your password");
        }
    }
}
