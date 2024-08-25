import { BadRequestException, Injectable } from '@nestjs/common';
import { TaskStatus } from './task.enums';
import { basicCreateTaskDTO } from './dtos/createTask.dto';
import { randomUUID } from 'crypto';
import { basicUpdateTaskDTO } from './dtos/updateTask.dto';
import { TaskRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getSpecificTaskFromSystem(id: String): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createTask(basicCreateTaskDTO: basicCreateTaskDTO): Promise<Task> {
    let { taskName } = basicCreateTaskDTO;
    let createdTask = await this.taskRepository.create({
      name: taskName,
      status: TaskStatus.TODO,
    });
    await this.taskRepository.save(createdTask);
    return createdTask;
  }

  async updateTaskInSystem(basicParameters: basicUpdateTaskDTO, id: string) {
    let { taskStatus, name } = basicParameters;
    let dataToChange = {};
    if (taskStatus) {
      dataToChange['status'] = taskStatus;
    }
    if (name) {
      dataToChange['name'] = name;
    }

    // checking if the task exists with the same name
    if (name) {
      let existingTask = await this.taskRepository.findOne({
        where: {
          name: name,
        },
      });
      if (existingTask && existingTask.id !== id) {
        throw new BadRequestException('Task with the same name already exists');
      }
    }
    await this.taskRepository.update({ id: id }, dataToChange);
    return {
      message: 'Task updated successfully',
    };
  }

  async deleteTaskFromSystem(taskId: string) {
    this.taskRepository.delete({ id: taskId });
    return {
      message: 'Task deleted successfully',
    };
  }
}
