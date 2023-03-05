import config from '@telman/config'
import {
	ClientsModule,
	ClientProviderOptions,
	Transport,
} from '@nestjs/microservices'
import { DynamicModule } from '@nestjs/common'
import { KafkaConfigRegister } from './types'

abstract class IKafkaConfig {
	static register: (config: KafkaConfigRegister) => DynamicModule
	static getMicroseviceInfo: (
		name: string,
		useClient: boolean,
	) => ClientProviderOptions
}

const KAFKA_BROKERS = config.KAFKA_BROKERS.split(',')

export class KafkaConfig implements IKafkaConfig {
	static register(moduleConfig: KafkaConfigRegister): DynamicModule {
		const serivces = moduleConfig.servicesName.map((service) =>
			this.getMicroseviceInfo(service, true),
		)
		return ClientsModule.register(serivces)
	}

	static getMicroseviceInfo(
		name: string,
		useClient: boolean = false,
	): ClientProviderOptions {
		return {
			name: name,
			transport: Transport.KAFKA,
			options: {
				client: {
					clientId: useClient ? name : null,
					brokers: KAFKA_BROKERS,
				},
				producer: {
					allowAutoTopicCreation: true,
				},
				consumer: {
					groupId: `${name}-consumer`,
				},
			},
		} as ClientProviderOptions
	}
}
