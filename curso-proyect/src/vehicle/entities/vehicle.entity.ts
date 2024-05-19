import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/users.entity'; // Asegúrate de que la ruta sea correcta

@Entity('vehicles')
export class Vehicle {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  plate: string;

  @Column({ type: 'varchar', length: 15 })
  color: string;

  @Column({ type: 'varchar', length: 20 })
  brand: string;

  @Column({ type: 'varchar', length: 60 })
  model: string;

  @ManyToOne(() => User, (user) => user.vehicles)
  owner: User;
}

