import { Controller, Post, Res, HttpStatus, Body, Get, Delete,
    UsePipes, ValidationPipe, Query, NotFoundException, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto'
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('/create')
    async createPost(@Res() res, @Body() createuserDTO: CreateUserDTO) {
        try{
        const newUser = await this.userService.createUser(createuserDTO)
        return res.status(HttpStatus.OK).json({
            message: 'User Created',
            user: newUser
        });
    }catch{console.error();
    }
    }
    @Get('/allUsers')
    async getUser(@Res() res) {
        const users = await this.userService.getUsers();
        res.status(HttpStatus.OK).json({
            message: 'Users',
            users: users
        });
    }
    @Delete('/delete')
    async deleteUser(@Res() res, @Query('userID') userID) {
        const deletedUser = await this.userService.deleteUser(userID)
        if (!deletedUser) throw new NotFoundException('User does not exits');
        return res.status(HttpStatus.OK).json({
            message: 'user deleted',
            deletedUser
        });
    }
    @Put('/update')
    async updateUser(@Res() res, @Body() createuserDTO: CreateUserDTO, @Query('userID') userID) {
        const updatedUser = await this.userService.updateUser(userID, createuserDTO);
        if (!updatedUser) throw new NotFoundException('user does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'user updated',
            updatedUser
        });
    }


}
