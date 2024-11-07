import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService {
    constructor( private readonly userRepository: UserRepository,
    ) {}

    getUsers(page: number, limit: number) {
        return  this.userRepository.getUsers(page, limit);
    }

    getUser(id: string) {
        return this.userRepository.getUser(id);
    }

    createUser(user: any) {
        return this.userRepository.createUser(user);
    }

    updateUser(id: string, user: any) {
        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }

    getUsersByEmail(email: string) {
        return this.userRepository.getUsersByEmail(email);
    }

    makeAdmin(id: string) {
        return this.userRepository.makeAdmin(id);
    }

}