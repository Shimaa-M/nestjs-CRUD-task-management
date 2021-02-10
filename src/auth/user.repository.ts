/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as  bcrypt  from 'bcrypt';
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp( authCredentialsDTO : AuthCredentialsDTO ):Promise<void>{
        const {username,password} = authCredentialsDTO;
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        try{
        await user.save();
        }catch(err){
            console.log(err.code);
            if(err.code ==='23505'){
                throw new ConflictException('username aready found');
            }
            else{
                throw new InternalServerErrorException();
            }
        }
        
    }

    async validateUserPassword(authCredentialsDTO : AuthCredentialsDTO):Promise<string>
    {
        const {username,password} = authCredentialsDTO;
        const user = await this.findOne({username});
        if (user&& await user.validatePassword(password))
        {
            console.log(`${user.username}is username` );
            return user.username;
        }else
        {
            console.log(`${user.username}is username` );
            return null;
        }
    }

    private async hashPassword(password:string,salt:string): Promise<string>
    {
       return bcrypt.hash(password,salt);
    }
}