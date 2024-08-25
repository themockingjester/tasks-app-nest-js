import { PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../task.enums';

const { Entity, Column, PrimaryColumn } = require('typeorm');

@Entity()
export class Task {
  // Entity properties

  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: String;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus;
}
