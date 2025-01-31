import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from './user.schema';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  action: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
