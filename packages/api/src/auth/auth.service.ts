import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/createUser.dto'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { JwtPayload } from './strategies/accessToken.strategy'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(loginDto: LoginDto) {
        try {
        } catch (error) {
            throw error
        }
    }

    async signUp(createUserDto: CreateUserDto) {
        try {
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
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    name,
                },
                {
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
