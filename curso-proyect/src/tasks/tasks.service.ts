import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async getTask(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Tarea con id ${id} no encontrada`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(task);
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.getTask(id);
        this.taskRepository.merge(task, updateTaskDto);
        return await this.taskRepository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const task = await this.getTask(id);
        await this.taskRepository.remove(task);
    }

    async patchTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
        return await this.updateTask(id, updateTaskDto);
    }
}
