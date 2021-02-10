/* eslint-disable prettier/prettier */
import { taskStatus } from "../task-status.enum";
import { IsOptional , IsIn , IsNotEmpty } from 'class-validator';

export class GetTasksFilterDTO{
    @IsOptional()
    @IsIn([taskStatus.OPEN,taskStatus.IN_PROGGRESS,taskStatus.DONE])
    status : taskStatus;

    @IsOptional()
    @IsNotEmpty()
    search : string;
} 