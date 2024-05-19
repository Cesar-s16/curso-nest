import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehiclesController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, User])],
  controllers: [VehiclesController],
  providers: [VehicleService],
})
export class VehicleModule {}
