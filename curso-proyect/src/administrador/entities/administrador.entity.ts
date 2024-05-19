import { User } from "src/users/entities/users.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('administradores')
export class Administrador {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id' }) 
    user: User;
}
