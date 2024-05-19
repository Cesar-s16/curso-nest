import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaController } from './categorias.controller';
import { CategoriaService } from './categorias.service';

describe('CategoriasController', () => {
  let controller: CategoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaController],
      providers: [CategoriaService],
    }).compile();

    controller = module.get<CategoriaController>(CategoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
