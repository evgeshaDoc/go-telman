import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator'

export class CreateUserDto {
	@IsString()
	name: string

	@IsString()
	surname: string

	@IsEmail()
	email: string

	@IsString()
	@Length(8)
	@IsStrongPassword()
	password: string
}
