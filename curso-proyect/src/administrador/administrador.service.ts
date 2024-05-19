import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {
  constructor(
    @InjectRepository(Administrador)
    private administradorRepository: Repository<Administrador>,
  ) {}

  async findAll(): Promise<Administrador[]> {
    return this.administradorRepository.find();
  }

  async findOne(id: number): Promise<Administrador> {
    const administrador = await this.administradorRepository.findOne({where : {id}});
    if (!administrador) {
      throw new NotFoundException(`Administrador with ID ${id} not found`);
    }
    return administrador;
  }

}
