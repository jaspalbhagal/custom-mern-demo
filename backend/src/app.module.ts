import { DataSource } from 'typeorm';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { PdfModule } from './pdf/pdf.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'custom_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    UserModule,
    ActivityModule,
    PdfModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
