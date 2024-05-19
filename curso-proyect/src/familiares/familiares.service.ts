import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Familiar } from './entities/familiare.entity';
import { CreateFamiliarDto } from './dto/create-familiare.dto';
import { UpdateFamiliareDto } from './dto/update-familiare.dto';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class FamiliaresService {
  constructor(
    @InjectRepository(Familiar)
    private readonly familiarRepository: Repository<Familiar>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createFamiliar(createFamiliarDto: CreateFamiliarDto): Promise<Familiar> {
    const user = await this.userRepository.findOne({ where: { id: createFamiliarDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${createFamiliarDto.userId} not found`);
    }

    const familiar = this.familiarRepository.create({
      ...createFamiliarDto,
      user,
    });

    return this.familiarRepository.save(familiar);
  }

  async getAllFamiliares(): Promise<Familiar[]> {
    return this.familiarRepository.find({ relations: ['user'] });
  }

  async getFamiliar(cedula: string, userId: number): Promise<Familiar> {
    const familiar = await this.familiarRepository.findOne({ where: { cedula, userId }, relations: ['user'] });
    if (!familiar) {
      throw new NotFoundException(`Familiar with cedula ${cedula} and userId ${userId} not found`);
    }
    return familiar;
  }

  async updateFamiliar(cedula: string, userId: number, updateFamiliarDto: UpdateFamiliareDto): Promise<Familiar> {
    const familiar = await this.getFamiliar(cedula, userId);
    this.familiarRepository.merge(familiar, updateFamiliarDto);
    return this.familiarRepository.save(familiar);
  }

  async deleteFamiliar(cedula: string, userId: number): Promise<void> {
    const familiar = await this.getFamiliar(cedula, userId);
    await this.familiarRepository.remove(familiar);
  }
}
