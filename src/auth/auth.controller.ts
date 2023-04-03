import { Controller, Body, Post, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: any, @Response() res: any) {
    const result = await this.authService.register(user);
    if (result.success == false) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: any, @Response() res: any) {
    const result = await this.authService.login(user);
    if (result.success == false) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  }
}
