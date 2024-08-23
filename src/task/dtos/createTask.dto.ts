import { Allow, IsNotEmpty, MinLength, minLength } from 'class-validator';
export class basicCreateTaskDTO {
  @IsNotEmpty() //  validation pipe
  @MinLength(3) //  validation pipe
  taskName: string;
}
