import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Indicador } from 'src/indicadores/entities/indicadores.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Indicador)
    private readonly indicadorRepository: Repository<Indicador>
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const indicator = await this.indicadorRepository.findOne({
      where: {
        indice: createCategoriaDto.idIndicador,
      }, 
    });

    if (!indicator) {
      throw new NotFoundException('Indicador not found');
    }

    const categoria = this.categoriaRepository.create({
      ...createCategoriaDto,
      indicador: indicator,
    });

    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ relations: ['indicador'] });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id }, relations: ['indicador'] });
    if (!categoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    await this.categoriaRepository.update(id, updateCategoriaDto);
    const updatedCategoria = await this.categoriaRepository.findOne({ where: { id }, relations: ['indicador'] });
    if (!updatedCategoria) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
    return updatedCategoria;
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria with ID ${id} not found`);
    }
  }
}
