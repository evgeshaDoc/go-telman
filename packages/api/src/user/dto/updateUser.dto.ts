import { IsEmail, IsString, Length } from 'class-validator'

export class UpdateUserDto {
    @IsString()
    @Length(4, 255)
    name?: string

    @IsString()
    @Length(4, 255)
    surname?: string

    @IsString()
    @Length(4, 255)
    patronymic?: string

    @IsEmail()
    email?: string
}
