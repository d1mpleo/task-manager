import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(40)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    password: string;

    description: Record<string, any>;
}