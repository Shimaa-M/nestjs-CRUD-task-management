/* eslint-disable prettier/prettier */
import { BadRequestException, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses=[
        taskStatus.OPEN,
        taskStatus.IN_PROGGRESS,
        taskStatus.DONE
    ]
 transform(value:any){
    console.log(value);
    value = value.toUpperCase();
    console.log(value);
     if (!this.isStatusValid(value)){
         throw new BadRequestException('"${value}" is not valid value');
     }
    return value;
 }
 private isStatusValid(status:any){
     const idx = this.allowedStatuses.indexOf(status);
     return idx != -1;
 }
}