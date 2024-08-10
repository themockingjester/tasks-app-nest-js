import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { basicCreateTaskDTO } from './dtos/createTask.dto';
import { randomUUID } from 'crypto';
@Injectable()
export class TaskService {
  tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(basicCreateTaskDTO: basicCreateTaskDTO): Task {
    let { taskName } = basicCreateTaskDTO;
    const currentTask: Task = {
      id: randomUUID(),
      name: taskName,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(currentTask);
    return currentTask;
  }
}
