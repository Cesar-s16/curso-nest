import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 16, unique: true })
  cardNumber: string;

  @Column({ type: 'varchar', length: 5 })
  expiryDate: string;

  @Column({ type: 'varchar', length: 3 })
  cvv: string;

  @OneToOne(() => User, user => user.card)
  @JoinColumn()
  userId: User;
}
