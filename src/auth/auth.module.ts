import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './services/local.strategy';
import { PrismaService } from 'src/services/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterService,
    LoginService,
    LocalStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
