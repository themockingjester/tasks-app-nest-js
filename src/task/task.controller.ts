import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { basicCreateTaskDTO } from './dtos/createTask.dto';
import { Task } from './task.model';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get('/all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() basicCreateTaskDTO: basicCreateTaskDTO): Task {
    return this.taskService.createTask(basicCreateTaskDTO);
  }
}
