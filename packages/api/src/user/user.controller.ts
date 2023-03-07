import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	HttpCode,
	HttpException,
	NotFoundException,
	Inject,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserDto } from './dto/createUser.dto'
import { SendData } from './types/main'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get(':id')
	async getUser(@Param('id') id: string) {
		try {
		} catch (error) {
			throw new NotFoundException('User Not Found')
		}
	}

	@Post('/')
	@HttpCode(201)
	async createUser(@Body() userDto: CreateUserDto) {
		try {
			this.userService.create(userDto)
			return 'User successfilly created'
		} catch (error) {
			throw new HttpException(
				'Error while creating user, try again later',
				500,
			)
		}
	}

	@Post('/delete/:id')
	async deleteUser(@Param('id') id: string) {
		try {
			return 'User deleted'
		} catch (error) {
			throw new HttpException('Error while deleting user', 500)
		}
	}
}
