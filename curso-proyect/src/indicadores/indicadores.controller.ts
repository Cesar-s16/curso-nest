import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { IndicadorService } from './indicadores.service';
import { Response } from 'express';
import { CreateIndicadorDto } from './dto/create-indicadores.dto';
import { UpdateIndicadorDto } from './dto/update-indicadores.dto';

@Controller('indicadores')
export class IndicadorController {
    constructor(private readonly indicadorService: IndicadorService) {}

    @Get()
    async getAllIndicadores(@Res() response: Response) {
        const indicadores = await this.indicadorService.findAll();
        return response.json(indicadores);
    }

    @Get('/:id')
    async getIndicador(@Param('id') id: string, @Res() response: Response) {
        try {
            const indicador = await this.indicadorService.findOne(Number(id));
            return response.json(indicador);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createIndicador(@Body() newIndicador: CreateIndicadorDto, @Res() response: Response) {
        const createdIndicador = await this.indicadorService.create(newIndicador);
        return response.json(createdIndicador);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateIndicador(@Param('id') id: string, @Body() updatedIndicador: UpdateIndicadorDto, @Res() response: Response) {
        try {
            const indicador = await this.indicadorService.update(Number(id), updatedIndicador);
            return response.json(indicador);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    @Delete('/:id')
    async deleteIndicador(@Param('id') id: string, @Res() response: Response) {
        try {
            await this.indicadorService.remove(Number(id));
            return response.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
