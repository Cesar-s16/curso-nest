import { Module } from '@nestjs/common';
import { CategoriaService } from './categorias.service';
import { CategoriaController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Indicador } from 'src/indicadores/entities/indicadores.entity';
import { Categoria } from './entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Indicador])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriasModule {}
