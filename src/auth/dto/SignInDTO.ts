import { IsNotEmpty } from "class-validator";


export class signInDTO{
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}