import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorController } from './indicadores.controller';
import { IndicadorService } from './indicadores.service';

describe('IndicadoresController', () => {
  let controller: IndicadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicadorController],
      providers: [IndicadorService],
    }).compile();

    controller = module.get<IndicadorController>(IndicadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
