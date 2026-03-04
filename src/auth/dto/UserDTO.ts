import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: "Password is too weak"})
    password: string;

    description: Record<string, any>;
}