import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../interfaces/login-response/login-response.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<LoginResponse> {
    const user = await this.authService.hardLogin({
      email: username,
      password,
    });
    if (user.success == false) {
      throw new UnauthorizedException(user.error);
    }
    return user;
  }
}
