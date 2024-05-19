import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Administrador } from 'src/administrador/entities/administrador.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Empleado)
        private empleadoRepository: Repository<Empleado>,
        @InjectRepository(Administrador)
        private administradorRepository: Repository<Administrador>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return user;
    }

    async createUser(newUser: CreateUserDto): Promise<User> {
        const userFound = await this.userRepository.findOne({
            where: {
                email: newUser.email
            }
        });

        if (userFound) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        const user = this.userRepository.create(newUser);
        const createdUser = await this.userRepository.save(user);

        // Si el nuevo usuario es de tipo empleado, crea un empleado asociado
        if (newUser.type === 'empleado') {
            const newEmployee = new Empleado();
            newEmployee.id = createdUser.id; 
            newEmployee.sector = newUser.sector; 
            await this.empleadoRepository.save(newEmployee);
        } else {
            const newAdmin = new Administrador();
            newAdmin.id = createdUser.id;
            await this.administradorRepository.save(newAdmin);
        }

        return createdUser;
    }

    async updateUser(id: number, updatedUser: UpdateUserDto): Promise<User> {
        const user = await this.getUser(id);

        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        
        this.userRepository.merge(user, updatedUser);
        return await this.userRepository.save(user);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUser(id);

        if (!user) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        await this.userRepository.remove(user);
    }
}