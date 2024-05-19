import { Module } from '@nestjs/common';
import { IndicadorService } from './indicadores.service';
import { IndicadorController } from './indicadores.controller';
import { Indicador } from './entities/indicadores.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Indicador])],
  controllers: [IndicadorController],
  providers: [IndicadorService],
})
export class IndicadoresModule {}
