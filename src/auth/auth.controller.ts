import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Response, Request, request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('login')
  @Render('signup')
  login() {
    return { message: 'Hello world!' };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login2(@Body() data: any, @Res() res: Response) {
    console.log(data);
    res.redirect('/user');
  }

  @Get('logout')
  salir(@Body() data: any, @Req() req, @Res() res: Response) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  }
}
