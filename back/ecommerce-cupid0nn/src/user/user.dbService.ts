import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { UserRepository } from "./user.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../Entityes/User.entity";
import { CreateUserDto } from "src/DTOs/CreateUserDto ";

@Injectable()
export class UserDbServices {
    constructor(@InjectRepository(UserRepository) private  UserDbRepository:Repository<UserEntity>) {}
    
    updateUser(id: string, user: CreateUserDto) {
        return this.UserDbRepository.update(id, user);
    }
    async createUser(user) {
       return await this.UserDbRepository.save(user);
    }

    async getUser(id: string) {
        return await this.UserDbRepository.findOneBy({id});
    }
}
    