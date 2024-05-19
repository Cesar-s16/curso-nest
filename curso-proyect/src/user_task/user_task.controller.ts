import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserTasksService } from './user_task.service';
import { CreateUserTaskDto } from './dto/create-user_task.dto';
import { UpdateUserTaskDto } from './dto/update-user_task.dto';
import { Response } from 'express';

@Controller('user-tasks')
export class UserTasksController {
  constructor(private readonly userTasksService: UserTasksService) {}

  @Get()
  async getAllUserTasks(@Res() response: Response) {
    const userTasks = await this.userTasksService.getAllUserTasks();
    return response.json(userTasks);
  }

  @Get('/:id')
  async getUserTask(@Param('id') id: string, @Res() response: Response) {
    try {
      const userTask = await this.userTasksService.getUserTask(Number(id));
      return response.json(userTask);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createUserTask(@Body() createUserTaskDto: CreateUserTaskDto, @Res() response: Response) {
    try {
      const newUserTask = await this.userTasksService.createUserTask(createUserTaskDto);
      return response.json(newUserTask);
    } catch (error) {
      return response.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateUserTask(@Param('id') id: string, @Body() updateUserTaskDto: UpdateUserTaskDto, @Res() response: Response) {
    try {
      const updatedUserTask = await this.userTasksService.updateUserTask(Number(id), updateUserTaskDto);
      return response.json(updatedUserTask);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  @Delete('/:id')
  async deleteUserTask(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.userTasksService.deleteUserTask(Number(id));
      return response.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
