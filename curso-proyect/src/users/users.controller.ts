import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(@Res() response: Response) {
        const users = await this.usersService.getAllUsers();
        return response.json(users);
    }

    @Get('/:id')
    async getUser(@Param('id') id: string, @Res() response: Response) {
        try {
            const user = await this.usersService.getUser(Number(id));
            return response.json(user);
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
    async createUser(@Body() newUser: CreateUserDto, @Res() response: Response) {
        const createdUser = await this.usersService.createUser(newUser);
        return response.json(createdUser);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDto, @Res() response: Response) {
        try {
            const user = await this.usersService.updateUser(Number(id), updatedUser);
            return response.json(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string, @Res() response: Response) {
        try {
            await this.usersService.deleteUser(Number(id));
            return response.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}
