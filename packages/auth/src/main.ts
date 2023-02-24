import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { KafkaConfig, ServicesEnum } from '@telman/kafka'

async function bootstrap() {
	const app = await NestFactory.createMicroservice(
		AuthModule,
		KafkaConfig.getMicroseviceInfo(ServicesEnum.AUTH),
	)
	await app.listen()
}
bootstrap()
