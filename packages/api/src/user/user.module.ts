import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RmqModule } from '@telman/rmq'

@Module({
    imports: [RmqModule.register({ name: 'USER' })],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
