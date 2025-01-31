import { Response } from 'express';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guards';
import { Roles } from '../auth/roles.decorator';

import { User } from '../schema/user.schema';
import { PdfService } from '../pdf/pdf.service';
import { ActivityService } from '../activity/activity.service';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly activityService: ActivityService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string): Promise<User[]> {
    return this.userService.findByEmail(email);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin')
  async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateuser(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Post(':id/login')
  async login(@Param('id') id: number) {
    await this.userService.incrementLogins(id);
    await this.activityService.logActivity(id, 'login');
    return { message: 'User login recorded.' };
  }

  @Post(':id/download')
  async download(@Param('id') id: number) {
    await this.userService.incrementDownloads(id);
    await this.activityService.logActivity(id, 'download');
    return { message: 'User download recorded.' };
  }

  @Get(':id/pdf')
  async getUserPDF(@Param('id') id: number, @Res() res: Response) {
    await this.userService.incrementDownloads(id);
    await this.activityService.logActivity(id, 'download');

    let user = await this.userService.findOneUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activities = await this.activityService.findAllByUser(id);
    try {
      const pdfBuffer = await this.pdfService.generateUserReport(
        user,
        activities,
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${user.name}-report.pdf"`,
      );
      res.end(pdfBuffer);
    } catch (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).json({ message: 'Error generating PDF report' });
    }
  }
}
