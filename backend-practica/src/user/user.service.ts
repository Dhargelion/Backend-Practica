import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import { from } from 'rxjs';
import {InjectModel} from '@nestjs/mongoose'
import {user} from './interfaces/user.interface'
import {CreateUserDTO} from './dto/user.dto'



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<user>) {
    }

    async getUsers(): Promise<user[]> {
        const users = await this.userModel.find()
        return users;

    }
    async createUser( createUserDTO :CreateUserDTO): Promise<user> {
        try{const user = new this.userModel(createUserDTO);
        return user.save();}
        catch{
            console.error();
        }
    }
    async deleteUser(UserID: string): Promise<user> {
        const delUser= await this.userModel.findByIdAndDelete(UserID);
        return delUser;
    }
    async updateUser(userID: string, createUserDTO:CreateUserDTO): Promise <user> {
        const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, {new:true});
        return updatedUser;
    }
}
