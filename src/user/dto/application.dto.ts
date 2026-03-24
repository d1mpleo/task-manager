import { IsString, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';

export class CreateApplicationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    company: string;

    @IsString()
    @IsNotEmpty()
    description: string;


}


export class ApplicationDto {
    id: string;
    title: string;
    company: string;
    description: string;
    appliedAt: Date;
}