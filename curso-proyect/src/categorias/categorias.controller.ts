import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaService } from './categorias.service';
import { Response } from 'express';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Get()
    async getAllCategorias(@Res() response: Response) {
        const categorias = await this.categoriaService.findAll();
        return response.json(categorias);
    }

    @Get('/:id')
    async getCategoria(@Param('id') id: string, @Res() response: Response) {
        try {
            const categoria = await this.categoriaService.findOne(Number(id));
            return response.json(categoria);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    @Post()
    @HttpCode(201)
    @UsePipes(new ValidationPipe())
    async createCategoria(@Body() newCategoria: CreateCategoriaDto, @Res() response: Response) {
        const createdCategoria = await this.categoriaService.create(newCategoria);
        return response.json(createdCategoria);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateCategoria(@Param('id') id: string, @Body() updatedCategoria: UpdateCategoriaDto, @Res() response: Response) {
        try {
            const categoria = await this.categoriaService.update(Number(id), updatedCategoria);
            return response.json(categoria);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }

    @Delete('/:id')
    async deleteCategoria(@Param('id') id: string, @Res() response: Response) {
        try {
            await this.categoriaService.remove(Number(id));
            return response.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
