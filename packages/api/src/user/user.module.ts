import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { KafkaConfig, ServicesEnum } from '@telman/kafka'

@Module({
	imports: [KafkaConfig.register({ servicesName: [ServicesEnum.USER] })],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
