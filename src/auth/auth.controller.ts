import {
  Controller,
  Body,
  Post,
  Response,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('me')
  async me(@Request() req: any, @Response() res: any) {
    return 'me';
  }

  @Post('register')
  async register(@Body() user: any, @Response() res: any) {
    return await this.authService.register(user, res);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async localLogin(@Request() req: any, @Response() res: any) {
    console.log('login');
    return await this.authService.login(req.user, res);
  }

  /**
   * @description
   * Este método es el encargado de redirigir al usuario a la página de autenticación de GitHub
   * y luego de autenticarse, GitHub redirige al usuario a la ruta /auth/github/callback
   * donde se ejecuta el método githubLoginCallback
   * @param req
   * @param res
   * @returns
   * @memberof AuthController
   * 
   */
  @Post('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // El usuario será redirigido a la página de autenticación de GitHub
  }

  @Post('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req, @Response() res) {
    return await this.authService.login(req.user, res);
  }
}
