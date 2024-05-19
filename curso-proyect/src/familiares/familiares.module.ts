import { Module } from '@nestjs/common';
import { FamiliaresService } from './familiares.service';
import { FamiliaresController } from './familiares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familiar } from './entities/familiare.entity';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Familiar, User])],
  controllers: [FamiliaresController],
  providers: [FamiliaresService],
})
export class FamiliaresModule {}
