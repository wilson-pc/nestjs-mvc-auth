import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Render,
  Res,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { AuthExceptionFilter } from 'src/auth-exceptions.filter';

@Controller('user')
@UseFilters(AuthExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: any, @Res() res: Response) {
    try {
      await this.userService.create(data);
      res.redirect('/user');
    } catch (error) {
      console.log(error);
      res.redirect('/user/register');
    }
  }

  @Get('register')
  @Render('users/create')
  Register() {
    return { users: [] };
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  @Render('users/index')
  async findAll() {
    const users = await this.userService.findAll();

    return { users: users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
