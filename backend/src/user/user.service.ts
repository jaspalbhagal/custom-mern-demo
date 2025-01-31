import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  findAllUser(): Promise<User[]> {
    return this.user.find();
  }

  findOneUser(id: number): Promise<User> {
    return this.user.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User[]> {
    return this.user.findBy({ email });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const { password, ...rest } = user;

    if (!password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.user.create({
      ...rest,
      password: hashedPassword,
    });
    return this.user.save(newUser);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    await this.user.update(id, user);
    return this.findOneUser(id);
  }

  deleteUser(id: number): Promise<void> {
    return this.user.delete(id).then(() => undefined);
  }

  async incrementLogins(userId: number): Promise<void> {
    await this.user.increment({ id: userId }, 'logins', 1);
  }

  async incrementDownloads(userId: number): Promise<void> {
    await this.user.increment({ id: userId }, 'pdfDownloads', 1);
  }
}
