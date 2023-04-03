import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/interfaces/login-dto/login-dto.interface';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from 'src/auth/interfaces/login-response/login-response.interface';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtTokenService: JwtService,
  ) {}

  async verifyPassword(
    plainPassword: string,
    hashPasword: string,
  ): Promise<any> {
    return await bcrypt.compare(plainPassword, hashPasword);
  }

  async softLogin(user: LoginDto): Promise<Object> {
    const payload = { email: user.email, sub: user.password };
    return {
      success: true,
      access_token: this.jwtTokenService.sign(payload),
    };
  }

  async hardLogin(user: LoginDto): Promise<Object> {
    try {
      const result = await this.prisma.user.findUnique({
        where: { email: user.email },
      });

      if ((await this.verifyPassword(user.password, result.password)) != true) {
        return null;
      }
      return result;
    } catch (err) {
      console.log(err.code);
      return null;
    }
  }
}
