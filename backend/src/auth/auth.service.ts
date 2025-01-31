import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user[0].password))) {
      const { password, ...result } = user[0];
      return result; 
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    const jwtToken = this.jwtService.sign(payload);
    if (jwtToken) {
      await this.userService.incrementLogins(user.id);
      return {
        access_token: jwtToken,
      };
    }
  }
}
