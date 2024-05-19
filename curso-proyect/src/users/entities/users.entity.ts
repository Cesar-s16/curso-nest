import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne
} from 'typeorm'
import { UserTask } from 'src/user_task/entities/user_task.entity'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { Card } from 'src/cards/entities/card.entity'
import { Familiar } from 'src/familiares/entities/familiare.entity'
import { Empleado } from 'src/empleado/entities/empleado.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 20 })
  telefono: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @OneToMany(() => UserTask, (userTask) => userTask.userId)
  userTasks: UserTask[]

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles: Vehicle[]

  @OneToOne(() => Card, (card) => card.userId)
  card: Card

  @OneToMany(() => Familiar, (familiar) => familiar.user)
  familiares: Familiar[]

  @OneToMany(() => Empleado, (empleado) => empleado.id)
  empleado: Empleado[]
}
