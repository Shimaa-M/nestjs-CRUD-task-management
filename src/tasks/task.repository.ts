/* eslint-disable prettier/prettier */
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDTO } from "./DTO/create-task-dto";
import { GetTasksFilterDTO } from "./DTO/get-tasks-filters-dto";
import { taskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
private logger = new Logger('TaskRepository');
    async getTasks(fiterDTO :GetTasksFilterDTO,user:User) : Promise<Task[]> 
        {
           const {status,search}= fiterDTO;
           const query = this.createQueryBuilder('task');
           
           query.where('task.userId=:userId',{userId:user.id});
           if(status){
             query.andWhere('task.status =:status',{status})
           }

           if(search){
             query.andWhere('(task.title Like :search OR task.description Like :search )',{search : '%${search}%'})
           }
           try{
           const tasks = await query.getMany();
           return tasks;
           }catch(err){
             this.logger.error('failed to get all tasks');
             throw new InternalServerErrorException();
           }
        }

    async createTask(createTaskDTO: CreateTaskDTO,user:User ) : Promise<Task> {
        const {title,description} =createTaskDTO;
    
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = taskStatus.OPEN;
        task.user=user;   
        try{
        await task.save();
        }catch(err){
          this.logger.error('failed');
          throw new InternalServerErrorException();
        }
        return task;
}   
}