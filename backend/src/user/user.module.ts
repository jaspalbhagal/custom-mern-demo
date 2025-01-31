import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../schema/user.schema';
import { PdfModule } from '../pdf/pdf.module';
import { ActivityModule } from '../activity/activity.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ActivityModule, PdfModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
