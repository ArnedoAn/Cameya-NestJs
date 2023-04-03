import { Controller, Body, Post, Response, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: any, @Response() res: any) {
    return await this.authService.register(user, res);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any, @Response() res: any) {
    console.log('login');
    return await this.authService.login(req.user, res);
  }
}
