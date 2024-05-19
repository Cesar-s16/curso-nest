import { Module } from '@nestjs/common';
import { UserTasksService } from './user_task.service';
import { UserTasksController } from './user_task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTask } from './entities/user_task.entity';
import { User } from 'src/users/entities/users.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTask, User, Task])],
  providers: [UserTasksService],
  controllers: [UserTasksController],
})
export class UserTasksModule {}
