/* eslint-disable prettier/prettier */
import { User } from "../auth/user.entity";
import { BaseEntity, PrimaryGeneratedColumn ,Entity,Column, ManyToOne} from "typeorm";
import { taskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {
@PrimaryGeneratedColumn()
public id : number;

@Column()
public title: string;

@Column()
public description: string;

@Column()
public status: taskStatus;

@ManyToOne(() => User, (user:User) => user.tasks, {eager:false})
public user : User;

@Column({nullable:true})
public userId : number;

}