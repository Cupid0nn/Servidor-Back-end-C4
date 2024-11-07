import { Module } from "@nestjs/common";
import { UsersControllers } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../Entityes/User.entity";
import { UserDbServices } from "./user.dbService";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
    controllers: [UsersControllers],
    providers: [UserService,UserRepository,UserDbServices]
})

export class UsersModule { }