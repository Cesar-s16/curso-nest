import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Entity('user_tasks')
export class UserTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    finished: boolean;
    
    @ManyToOne(() => User, user => user.userTasks)
    userId: User;

    @ManyToOne(() => Task, task => task.userTasks)
    taskId: Task;
}
