import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, NotFoundException, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';
import { CreateFamiliarDto } from './dto/create-familiare.dto';
import { UpdateFamiliareDto } from './dto/update-familiare.dto';
import { Response } from 'express';

@Controller('familiares')
export class FamiliaresController {
  constructor(private readonly familiaresService: FamiliaresService) {}

  @Get()
  async getAllFamiliares(@Res() response: Response) {
    const familiares = await this.familiaresService.getAllFamiliares();
    return response.json(familiares);
  }

  @Get('/:cedula/:userId')
  async getFamiliar(@Param('cedula') cedula: string, @Param('userId') userId: number, @Res() response: Response) {
    try {
      const familiar = await this.familiaresService.getFamiliar(cedula, userId);
      return response.json(familiar);
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
  async createFamiliar(@Body() createFamiliarDto: CreateFamiliarDto, @Res() response: Response) {
    try {
      const newFamiliar = await this.familiaresService.createFamiliar(createFamiliarDto);
      return response.json(newFamiliar);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Put('/:cedula/:userId')
  @UsePipes(new ValidationPipe())
  async updateFamiliar(@Param('cedula') cedula: string, @Param('userId') userId: number, @Body() updateFamiliarDto: UpdateFamiliareDto, @Res() response: Response) {
    try {
      const updatedFamiliar = await this.familiaresService.updateFamiliar(cedula, userId, updateFamiliarDto);
      return response.json(updatedFamiliar);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete('/:cedula/:userId')
  async deleteFamiliar(@Param('cedula') cedula: string, @Param('userId') userId: number, @Res() response: Response) {
    try {
      await this.familiaresService.deleteFamiliar(cedula, userId);
      return response.status(204).send();
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}
