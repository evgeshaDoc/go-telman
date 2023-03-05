import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ClientKafka } from '@nestjs/microservices'
import { ServicesEnum } from '@telman/kafka'
import { LoginDto } from './dto/login.dto'
import { JwtPayload } from './strategies/accessToken.strategy'

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		@Inject(ServicesEnum.AUTH) private authClient: ClientKafka,
	) {}

	async signIn(loginDto: LoginDto) {
		try {
			this.authClient.send('signIn', loginDto).subscribe()
			return this.getTokens(user.id, user.name)
		} catch (error) {
			throw error
		}
	}

	async signUp(createUserDto: CreateUserDto) {
		try {
			const candiate = await this.userService.create(createUserDto)

			if (!candiate) throw new Error('[AuthModule] Error creating user')

			const user = await this.userService.findOneByEmail(
				createUserDto.email,
			)

			return this.getTokens(user.id, user.name)
		} catch (error) {
			throw error
		}
	}

	async refreshTokens(tokeDto: JwtPayload) {
		return this.getTokens(tokeDto.userId, tokeDto.name)
	}

	async getTokens(userId: string, name: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					userId,
					name,
				},
				{
					secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
					expiresIn: '15m',
				},
			),
			this.jwtService.signAsync(
				{
					userId,
					name,
				},
				{
					secret: this.configService.get<string>(
						'JWT_REFRESH_SECRET',
					),
					expiresIn: '7d',
				},
			),
		])

		return {
			accessToken,
			refreshToken,
		}
	}
}
