import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(user: User): Promise<Object> {
    try {
      const result = await this.prisma.user.create({ data: user });
      return { success: true, result };
    } catch (err) {
      console.log(err.code);
      return {
        success: false,
        error: err.code == 'P2002' ? 'User already exists' : err.message,
      };
    }
  }
}
