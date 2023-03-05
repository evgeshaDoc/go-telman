import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { UpdateUserDto } from './dto/updateUser.dto'
import { SendGetUser } from './types/main'

@Injectable()
export class UserService {
	async onApplicationBootstap() {
		// await this.usersServiceClient.connect()
	}

	async create(id: string) {
		// const result = this.usersServiceClient.emit<SendGetUser>('userGet', id)
		return 'This action adds a new user'
	}

	findAllAvailable() {
		return `This action returns all user`
	}

	findOne(id: string) {
		return `This action returns a #${id} user`
	}

	update(updateUserDto: UpdateUserDto) {
		return `This action updates a #${updateUserDto} user`
	}

	remove(id: string) {
		return `This action removes a #${id} user`
	}
}
