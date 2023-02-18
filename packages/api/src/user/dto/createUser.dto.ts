import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @Length(4, 255)
    name: string

    @IsString()
    @Length(4, 255)
    surname: string

    @IsString()
    @Length(4, 255)
    patronymic: string

    @IsEmail()
    email: string

    @IsString()
    @Length(8)
    password: string
}
