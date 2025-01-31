import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':userId')
  async findByUser(@Param('userId') userId: number) {
    return this.activityService.findAllByUser(userId);
  }
}
