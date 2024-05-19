import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('indicadores')
export class Indicador {
  @PrimaryGeneratedColumn()
  indice: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  alias: string;

  @Column({ type: 'text' })
  textoAyuda: string;

  @OneToMany(() => Categoria, (categoria) => categoria.indicador)
  categoria: Categoria[]
}
