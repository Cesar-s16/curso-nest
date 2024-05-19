import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserTasksModule } from './user_task/user_task.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { CardsModule } from './cards/cards.module';
import { FamiliaresModule } from './familiares/familiares.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { AdministradorModule } from './administrador/administrador.module';
import { IndicadoresModule } from './indicadores/indicadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DepartamentosModule } from './departamentos/departamentos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'prueba',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), 
    TasksModule, 
    UsersModule, 
    UserTasksModule, 
    VehicleModule, 
    CardsModule, 
    FamiliaresModule, 
    EmpleadoModule, 
    AdministradorModule, IndicadoresModule, CategoriasModule, DepartamentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
