import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { basicCreateTaskDTO } from './dtos/createTask.dto';
import { basicUpdateTaskDTO } from './dtos/updateTask.dto';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get('/all')
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getSpecificTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getSpecificTaskFromSystem(id);
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() basicUpdateTaskDTO: basicUpdateTaskDTO,
  ) {
    return this.taskService.updateTaskInSystem(basicUpdateTaskDTO, id);
  }

  @Post()
  createTask(@Body() basicCreateTaskDTO: basicCreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(basicCreateTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTaskFromSystem(id);
  }
}
