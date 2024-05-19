import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Indicador } from 'src/indicadores/entities/indicadores.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'text' })
  textoAyuda: string;

  @ManyToOne(() => Indicador, indicador => indicador.categoria)
  indicador: Indicador;
}
