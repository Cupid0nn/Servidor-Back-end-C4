import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthServices } from "./Auth.service";
import { LoginUserDto } from "src/DTOs/CreateUserDto ";
import { CreateUserDto } from "src/DTOs/CreateUserDto ";
import { ApiTags } from "@nestjs/swagger";
@ApiTags('Auth')
@Controller("auth")
export class AuthControllers {
    constructor(private readonly authServices: AuthServices){}
    
    @Get ()
    GetAuth(){
        return this.authServices.GetAuth();
    }

    @Post ('singin')
    singin(@Body() credentials:LoginUserDto) {
        const {email, password} = credentials
        return this.authServices.singin(email, password);
    }

    @Post ("signup")
    signup(@Body() user: CreateUserDto) {
        return this.authServices.signup(user);
    }
}