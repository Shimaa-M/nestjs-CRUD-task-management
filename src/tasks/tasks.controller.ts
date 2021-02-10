/* eslint-disable prettier/prettier */
import { Controller, Get ,Post,Body,Param, Delete,Patch,Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Req, Logger} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDTO } from './DTO/create-task-dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filters-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

import { Task } from './task.entity';
import { taskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks') //this the route means /tasks
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');
constructor(private tasksService: TasksService){}

@Get()
getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO,
@Req() request)
{
    const user = request.user
    this.logger.verbose(`user ${user.username} retrieving tasks`);
    return this.tasksService.getTasks(filterDTO,user);

}

 @Get('/:id') //means /tasks/:id
 getTaskById(@Param('id',ParseIntPipe) id:number,
 @Req() request): Promise<Task> {
    
    const user = request.user
     return this.tasksService.getTaskById(id,user);
 }

 
 @Post()
 @UsePipes(ValidationPipe)
 createTask(@Body() createTaskDTO : CreateTaskDTO,
 @Req() request ): Promise<Task> {
     
        const user = request.user
     this.logger.verbose(`${user} i am posted `);
 return this.tasksService.createTask(createTaskDTO,user);
 }

@Patch('/:id/status')
updateTask(@Param('id', ParseIntPipe) id:number,
@Body('status',TaskStatusValidationPipe)  status:taskStatus,
@Req() request):Promise<Task> {
return this.tasksService.updateTask(id,status,request);
}

 @Delete('/:id')
async deleteTask(@Param('id',ParseIntPipe) id:number,@Req() request): Promise<void>{
     return this.tasksService.deleteTask(id,request);
 }
}
