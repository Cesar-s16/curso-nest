import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity('familiares')
export class Familiar {
  @PrimaryColumn()
  cedula: string;

  @PrimaryColumn()
  userId: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'enum', enum: ['hijo', 'conyuge'] })
  tipo: 'hijo' | 'conyuge';

  @ManyToOne(() => User, user => user.familiares, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
