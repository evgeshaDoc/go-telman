import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy'
import { AccessTokenStrategy } from './strategies/accessToken.strategy'
import { UserModule } from '../user/user.module'

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({})],
    providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
