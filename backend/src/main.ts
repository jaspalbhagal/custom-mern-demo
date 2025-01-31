import { DataSource } from 'typeorm';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { seedUsers } from './script/user.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const dataSource = app.get(DataSource);

  await seedUsers(dataSource);

  await app.listen(3000);

  console.log('Application is running on: http://localhost:3000');
}

bootstrap();
