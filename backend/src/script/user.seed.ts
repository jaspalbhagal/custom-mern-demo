import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../schema/user.schema';
import { Activity } from '../schema/activity.schema';

export async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const activityRepository = dataSource.getRepository(Activity);

  const users = [
    {
      name: 'Ramesh Shah',
      email: 'ramesh@example.com',
      role: 'Admin',
      password: 'ramesh@123',
      logins: 0,
      pdfDownloads: 0,
    },
    {
      name: 'Mahesh Patel',
      email: 'mahesh@example.com',
      role: 'User',
      password: 'mahesh@123',
      logins: 0,
      pdfDownloads: 0,
    },
    {
      name: 'Shreya Pandya',
      email: 'shreya@example.com',
      role: 'User',
      password: 'shreya@123',
      logins: 0,
      pdfDownloads: 0,
    },
  ];

  for (const user of users) {
    const existingUser = await userRepository.findOneBy({ email: user.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await userRepository.save({ ...user, password: hashedPassword });
    }
  }

  const activities = [
    { userId: 1, action: 'login' },
    { userId: 1, action: 'login' },
    { userId: 1, action: 'download' },
    { userId: 2, action: 'login' },
    { userId: 2, action: 'download' },
    { userId: 3, action: 'download' },
  ];

  for (const activity of activities) {
    await activityRepository.save({
      user: { id: activity.userId },
      action: activity.action,
    });

    const user = await userRepository.findOneBy({ id: activity.userId });
    if (user) {
      if (activity.action === 'login') {
        user.logins = (user.logins || 0) + 1;
      } else if (activity.action === 'download') {
        user.pdfDownloads = (user.pdfDownloads || 0) + 1;
      }
      await userRepository.save(user);
    }
  }

  console.log('Users & Activity seeded successfully with updated metrics!');
}
