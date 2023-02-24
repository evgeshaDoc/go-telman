import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { CreateUserDto } from '../user/dto/createUser.dto'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { JwtPayload } from './strategies/accessToken.strategy'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async signIn(loginDto: LoginDto) {
        try {
            const user = await this.userService.findBy({
                where: { email: loginDto.email },
                select: { password: true },
            })

            const comparePass = await compare(loginDto.password, user.password)

            if (!comparePass) throw new NotFoundException()

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
