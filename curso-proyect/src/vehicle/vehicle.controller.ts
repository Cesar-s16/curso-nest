import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Response } from 'express';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getAllVehicles(@Res() response: Response) {
    const vehicles = await this.vehicleService.getAllVehicles();
    return response.json(vehicles);
  }

  @Get('/:plate')
  async getVehicle(@Param('plate') plate: string, @Res() response: Response) {
    try {
      const vehicle = await this.vehicleService.getVehicle(plate);
      return response.json(vehicle);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto, @Res() response: Response) {
    const createdVehicle = await this.vehicleService.createVehicle(createVehicleDto);
    return response.json(createdVehicle);
  }

  @Put('/:plate')
  @UsePipes(new ValidationPipe())
  async updateVehicle(@Param('plate') plate: string, @Body() updateVehicleDto: UpdateVehicleDto, @Res() response: Response) {
    try {
      const vehicle = await this.vehicleService.updateVehicle(plate, updateVehicleDto);
      return response.json(vehicle);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete('/:plate')
  async deleteVehicle(@Param('plate') plate: string, @Res() response: Response) {
    try {
      await this.vehicleService.deleteVehicle(plate);
      return response.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}
