import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from './user_task.service';

describe('UserTaskService', () => {
  let service: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTasksService],
    }).compile();

    service = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
