import { Controller, Post, Body, Get, Param, Patch, Delete, Res, NotFoundException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async getAllTasks(@Res() response: Response) {
        try {
            const tasks = await this.tasksService.getAllTasks();
            return response.json(tasks);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    @Get('/:id')
    async getTask(@Param('id') id: string, @Res() response: Response) {
        try {
            const task = await this.tasksService.getTask(parseInt(id));
            return response.json(task);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createTask(@Body() createTaskDto: CreateTaskDto, @Res() response: Response) {
        try {
            const newTask = await this.tasksService.createTask(createTaskDto);
            return response.status(HttpStatus.CREATED).json(newTask);
        } catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Res() response: Response) {
        try {
            const updatedTask = await this.tasksService.updateTask(Number(id), updateTaskDto);
            return response.json(updatedTask);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string, @Res() response: Response) {
        try {
            await this.tasksService.deleteTask(Number(id));
            return response.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
        }
    }
}
