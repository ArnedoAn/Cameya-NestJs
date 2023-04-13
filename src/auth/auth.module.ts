import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register/register.service';
import { LoginService } from './services/login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './services/strategies/local.strategy';
import { PrismaService } from 'src/services/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './services/strategies/jwt.strategy';
import { GithubStrategy } from './services/strategies/github.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'local' }),
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
    JwtStrategy,
    GithubStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
