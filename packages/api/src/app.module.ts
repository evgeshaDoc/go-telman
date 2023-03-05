import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { KafkaConfig, ServicesEnum } from '@telman/kafka'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		UserModule,
		AuthModule,
		KafkaConfig.register({
			servicesName: [ServicesEnum.AUTH, ServicesEnum.USER],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
