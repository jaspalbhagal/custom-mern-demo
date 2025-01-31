import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Activity } from '../schema/activity.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activity: Repository<Activity>,
  ) {}

  logActivity(userId: number, action: string): Promise<Activity> {
    return this.activity.save({ user: { id: userId }, action });
  }

  findAllByUser(userId: number): Promise<Activity[]> {
    return this.activity.find({ where: { user: { id: userId } } });
  }
}
