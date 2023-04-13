import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('validate');
    const result = await this.authService.hardLogin({
      email,
      password,
    });
    if (!result) {
      console.log('UnauthorizedException');
      throw new UnauthorizedException({
        response: {
          message: 'Unauthorized',
          error: 'Incorrect Email or Password',
          statusCode: 401,
        },
      });
    }
    return result;
  }
}
