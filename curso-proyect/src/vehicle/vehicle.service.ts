// src/vehicles/vehicle.service.ts
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createVehicle(newVehicle: CreateVehicleDto): Promise<Vehicle> {
    const vehicleFound = await this.vehicleRepository.findOne({
      where: {
        plate: newVehicle.plate,
      },
    });

    if (vehicleFound) {
      throw new HttpException('Vehicle already exists', HttpStatus.CONFLICT);
    }

    const owner = await this.userRepository.findOne({
      where: {
        id: newVehicle.owner,
      }, 
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const vehicle = this.vehicleRepository.create({
      ...newVehicle,
      owner: owner,
    });
    return this.vehicleRepository.save(vehicle);
  }

  async getAllVehicles(): Promise<Vehicle[]> {
    //return this.vehicleRepository.find();
    return this.vehicleRepository.find({ relations: ['owner'] });
  }

  async getVehicle(plate: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { plate }, relations: ['owner'] });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found`);
    }
    return vehicle;
  }

  async updateVehicle(plate: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.getVehicle(plate);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found`);
    }

    if (updateVehicleDto.owner) {
      const owner = await this.userRepository.findOne({
        where: {
          id: updateVehicleDto.owner,
        },
      });

      if (!owner) {
        throw new NotFoundException('Owner not found');
      }

      vehicle.owner = owner;
    }

    // Merge the remaining properties
    this.vehicleRepository.merge(vehicle, {
      ...updateVehicleDto,
      owner: vehicle.owner // Ensure owner is the actual User entity
    });

    return this.vehicleRepository.save(vehicle);
  }

  async deleteVehicle(plate: string): Promise<void> {
    const vehicle = await this.getVehicle(plate);

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with plate ${plate} not found`);
    }

    await this.vehicleRepository.remove(vehicle);
  }
}
