import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  onModuleInit() {
    this.sequelize.sync({ force: false }).then((data) => {
      console.log('Base de datos conectada');
    });
  }
  create(data: any) {
    return this.userModel.create(data);
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(query): Promise<User> {
    return this.userModel.findOne({
      where: query,
      raw: true,
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
