import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from '../logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { EmpleadoModule } from 'src/empleado/empleado.module';
import { AdministradorModule } from 'src/administrador/administrador.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmpleadoModule, AdministradorModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(
      {
        path: "/users", method: RequestMethod.GET
      },
      {
        path: "/users", method: RequestMethod.POST
      }
    )//.apply(AuthMiddleware).forRoutes('users');
  }
}
