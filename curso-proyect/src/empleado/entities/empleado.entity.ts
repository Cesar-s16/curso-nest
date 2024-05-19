import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity('empleados')
export class Empleado {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    sector: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id' }) 
    user: User;
}
