import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreateUserDTO {
    @Length(3, 15)
    @IsNotEmpty()
    readonly name: string;

    
    @IsNotEmpty()
    @Length(1, 3)
    readonly age: number;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}