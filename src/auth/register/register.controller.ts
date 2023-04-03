import { Controller, Post, Res, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { User } from '@prisma/client';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Res() res, @Body() data: User): Promise<Object> {
    return res.json(await this.registerService.register(data));
  }
}
