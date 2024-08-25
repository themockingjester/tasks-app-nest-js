import {
  Allow,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  minLength,
} from 'class-validator';
import { TaskStatus } from '../task.enums';

export class basicUpdateTaskDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  taskStatus?: string;

  @IsOptional()
  @MinLength(3)
  name?: string;
}
