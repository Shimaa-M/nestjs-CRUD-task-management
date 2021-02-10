/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './DTO/create-task-dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filters-dto';
import { taskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
constructor (
    @InjectRepository(TaskRepository)
    private taskRepository:TaskRepository){

}

    async getTasks(filterDTO: GetTasksFilterDTO, user:User) :Promise<Task[]>{
         return this.taskRepository.getTasks(filterDTO,user);
     }
    
        async getTaskById(id:number, request) : Promise<Task> {
            const user = request.user
            const found = await this.taskRepository.findOne({where: {id,userId:user.id}});
            if(!found){
                   throw new NotFoundException('this "${id}" not found');
                  }
                 return found;
        }
   
    async createTask(createTaskDTO: CreateTaskDTO,user:User) : Promise<Task> {
            return this.taskRepository.createTask(createTaskDTO,user);
    }

    async updateTask(id:number,status:taskStatus,request): Promise<Task>{
         const task = await this.getTaskById(id,request);
         task.status=status;
         await task.save();
         return task;
     }

    async deleteTask(id:number,request):Promise<void>{
        const user = request.user;
        const task =await this.taskRepository.delete({id,userId:user.id});
       if(task.affected===0){
        throw new NotFoundException('this "${id}" not found');
       }
     }
}
