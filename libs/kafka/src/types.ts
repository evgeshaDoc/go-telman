import config from "@telman/config"

export enum ServicesEnum {
	USER = "USER_QUEUE",
	AUTH = "AUTH_QUEUE"
}

export type KafkaConfigRegister = {
	servicesName: ServicesEnum[]
}