import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserTask } from 'src/user_task/entities/user_task.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text' })
    information: string;

    @Column({ type: 'boolean', default: false })
    finished: boolean;

    @OneToMany(() => UserTask, (userTask) => userTask.taskId)
    userTasks: UserTask[];
}
