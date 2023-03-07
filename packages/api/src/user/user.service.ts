import { HttpException, Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { ServicesEnum } from '@telman/kafka'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { SendData } from './types/main'

@Injectable()
export class UserService {
    constructor(@Inject(ServicesEnum.USER) private userClient: ClientKafka) {}

    async onApplicationBootstap() {
        await this.userClient.connect()
    }

    async create(createUserDto: CreateUserDto) {
        const result = this.userClient.emit<HttpException, CreateUserDto>(
            ServicesEnum.USER,
            createUserDto,
        )
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
