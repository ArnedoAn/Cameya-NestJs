import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './services/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RegisterService, LoginService, LocalStrategy],
})
export class AuthModule {}
