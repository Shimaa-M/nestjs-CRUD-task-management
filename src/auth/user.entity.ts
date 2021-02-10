/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
   @PrimaryGeneratedColumn() 
   public id:number;

   @Column()
   public username: string;

   @Column()
   password:string;

   @Column()
   salt:string;

   @OneToMany(() => Task ,(task:Task) => task.user,{eager:true}) 
   public tasks: Task[];

   async validatePassword(password:string):Promise<boolean>{
      const hash = await bcrypt.hash(password,this.salt);
      return hash===this.password;
   }

}