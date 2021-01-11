import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}
  async validateUser(email, pass): Promise<any> {
    const user = await this.usersService.findOne({
      email: email,
      password: pass,
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
