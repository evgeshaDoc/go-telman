import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from '../user/dto/createUser.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenGuard } from './guards/refreshToken.guard'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('signin')
    async signIn(@Body() loginDto: LoginDto) {
        try {
            return this.authService.signIn(loginDto)
        } catch (error) {
            return new HttpException('Error while login', 500)
        }
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        try {
            return this.authService.signUp(createUserDto)
        } catch (error) {
            return new HttpException(error, 500)
        }
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refreshToken(@Request() req) {
        try {
            const { userId, name } = req.user
            return this.authService.refreshTokens({ name, userId })
        } catch (error) {
            return new HttpException(error, 500)
        }
    }
}
