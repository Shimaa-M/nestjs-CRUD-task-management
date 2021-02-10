/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { GetTasksFilterDTO } from './DTO/get-tasks-filters-dto';
import { taskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockUser = {id:12, username: 'Test user'};

const mockTaskRepository = () => ({
 getTasks : jest.fn(),
 findOne : jest.fn(),
});

describe('TasksService',() => {
 let tasksService;
 let taskRepository;


 beforeEach(async () => {
     const module = await Test.createTestingModule({
       providers: [
         TasksService,
         { provide: taskRepository, useFactory : mockTaskRepository},
       ],
     }).compile();

     tasksService = await module.get<TasksService>(TasksService);
     taskRepository = await module.get<TaskRepository>(TaskRepository);
     await taskRepository.init();
 });



  describe('getTasks', () => {
    it('/ (GET)',async () => {
      tasksService.getTasks.mockResolvedValue('someValue');
        expect(tasksService.getTasks).not.toHaveBeenCalled();
    
        const filters: GetTasksFilterDTO = {status: taskStatus.IN_PROGGRESS,search:'Some search query'};
        // call tasksService.getTasks
        const result = tasksService.getTasks(filters, mockUser);
        expect(tasksService.getTasks).toHaveBeenCalled();
        expect(result).toEqual('someValue');
    });
  });
  
    describe('getTaskById', () => {  
      it('returns all tasks related to certain user',async () => {
        const mockTask = {title: 'test title', description:'test desc'};
        tasksService.findOne.mockResolvedValue(mockTask);
         const result = tasksService.getTaskById(1, mockUser);
         expect(result).toEqual(mockTask);
        // expect(tasksService.findOne).not.toHaveBeenCalledWith(mockUser.id,mo);
     });
     it('throw an error', () => {

     });
 });  
});