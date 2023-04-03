import { Injectable } from '@nestjs/common';
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

  async register(user: User): Promise<RegisterResponse> {
    return await this.registerService.register(user);
  }

  async hardLogin(user: LoginDto): Promise<LoginResponse> {
    return (await this.loginService.hardLogin(user)) as LoginResponse;
  }

  async login(user: LoginDto): Promise<LoginResponse> {
    return (await this.loginService.softLogin(user)) as LoginResponse;
  }
}
