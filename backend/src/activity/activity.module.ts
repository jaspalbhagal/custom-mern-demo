import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 

import { Activity } from '../schema/activity.schema';

import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
