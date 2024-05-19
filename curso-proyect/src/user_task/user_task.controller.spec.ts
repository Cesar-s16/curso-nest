import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksController } from './user_task.controller';
import { UserTasksService } from './user_task.service';

describe('UserTaskController', () => {
  let controller: UserTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTasksController],
      providers: [UserTasksService],
    }).compile();

    controller = module.get<UserTasksController>(UserTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
