import { Injectable, Response } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { RegisterResponse } from '../interfaces/register-response/register-response.interface';
import { LoginResponse } from '../interfaces/login-response/login-response.interface';
import { LoginDto } from '../interfaces/login-dto/login-dto.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private registerService: RegisterService,
    private loginService: LoginService,
  ) {}

  async register(user: User, @Response() res: any): Promise<any> {
    const result = await this.registerService.register(user);
    if (result.success == false) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }

  async hardLogin(user: LoginDto): Promise<LoginResponse> {
    return (await this.loginService.hardLogin(user)) as LoginResponse;
  }

  async login(user: LoginDto, @Response() res: any): Promise<any> {
    const result = (await this.loginService.softLogin(user)) as LoginResponse;
    if (result.success == false) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  }
}
