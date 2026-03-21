import { IsNotEmpty, IsEmail, IsUUID, IsOptional } from 'class-validator';

export class AddSubordinateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}