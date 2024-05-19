import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Indicador } from './entities/indicadores.entity';
import { CreateIndicadorDto } from './dto/create-indicadores.dto';
import { UpdateIndicadorDto } from './dto/update-indicadores.dto';

@Injectable()
export class IndicadorService {
  constructor(
    @InjectRepository(Indicador)
    private readonly indicadorRepository: Repository<Indicador>,
  ) {}

  async create(createIndicadorDto: CreateIndicadorDto): Promise<Indicador> {
    const indicador = this.indicadorRepository.create(createIndicadorDto);
    return this.indicadorRepository.save(indicador);
  }

  async findAll(): Promise<Indicador[]> {
    return this.indicadorRepository.find();
  }

  async findOne(indice: number): Promise<Indicador> {
    const indicador = await this.indicadorRepository.findOne({ where : { indice }});
    if (!indicador) {
      throw new NotFoundException(`Indicador with ID ${indice} not found`);
    }
    return indicador;
  }

  async update(indice: number, updateIndicadorDto: UpdateIndicadorDto): Promise<Indicador> {
    await this.indicadorRepository.update(indice, updateIndicadorDto);
    const updatedIndicador = await this.indicadorRepository.findOne({ where : { indice }});
    if (!updatedIndicador) {
      throw new NotFoundException(`Indicador with ID ${indice} not found`);
    }
    return updatedIndicador;
  }

  async remove(indice: number): Promise<void> {
    const result = await this.indicadorRepository.delete(indice);
    if (result.affected === 0) {
      throw new NotFoundException(`Indicador with ID ${indice} not found`);
    }
  }
}
