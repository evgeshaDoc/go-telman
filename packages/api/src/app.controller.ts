import { Controller, Get, Inject } from '@nestjs/common'
import { ServicesEnum } from '@telman/kafka'
import { ClientKafka, EventPattern } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller('/test')
export class AppController {
	constructor(
		private readonly appService: AppService,
		@Inject(ServicesEnum.USER) private userService: ClientKafka,
	) {}

	@Get()
	getHello(): void {
		this.userService.emit(
			'get_user',
			JSON.stringify({ value: 'some', number: 1 }),
		)
	}

	@EventPattern('get_user.reply')
	async handleForeignData(payload: any) {
		// this.getHello();
		console.log(JSON.stringify(payload) + ' created')
	}

	onModuleInit() {
		this.userService.subscribeToResponseOf('get_user')
	}
}
