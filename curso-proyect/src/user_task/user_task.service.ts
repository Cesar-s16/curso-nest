import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTaskDto } from './dto/create-user_task.dto';
import { UpdateUserTaskDto } from './dto/update-user_task.dto';
import { UserTask } from './entities/user_task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserTasksService {
    constructor(
        @InjectRepository(UserTask)
        private userTaskRepository: Repository<UserTask>,
    ) {}

    async getAllUserTasks(): Promise<UserTask[]> {
        //return this.userTaskRepository.find();
        return this.userTaskRepository.find({ relations: ['userId', 'taskId'] });
    }

    async getUserTask(id: number): Promise<UserTask> {
        const userTask = await this.userTaskRepository.findOne({ where: { id } });
        if (!userTask) {
            throw new NotFoundException(`Tarea de usuario con id ${id} no encontrada`);
        }
        return userTask;
    }

    async createUserTask(newUserTask: CreateUserTaskDto): Promise<UserTask> {
        const userTask = this.userTaskRepository.create(newUserTask);
        return this.userTaskRepository.save(userTask);
    }

    async updateUserTask(id: number, updatedUserTask: UpdateUserTaskDto): Promise<UserTask> {
        const userTask = await this.getUserTask(id);
        this.userTaskRepository.merge(userTask, updatedUserTask);
        return this.userTaskRepository.save(userTask);
    }

    async deleteUserTask(id: number): Promise<void> {
        const userTask = await this.getUserTask(id);
        await this.userTaskRepository.remove(userTask);
    }
}
