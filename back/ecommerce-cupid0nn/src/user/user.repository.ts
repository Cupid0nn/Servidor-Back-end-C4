import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../Entityes/User.entity';


@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({ skip: skip, take: limit });
    return users.map(({ password,isAdmin,confirmPassword,IsSuperAdmin, ...userNoPassword }) => userNoPassword);
  }
  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) return `user with id ${id} not found`;
    const { password,isAdmin,confirmPassword,IsSuperAdmin, ...userNoPassword } = user;
    return userNoPassword;
  }
  async createUser(user: Partial<UserEntity>): Promise<Partial<UserEntity>> {
    const newUser = await this.userRepository.save(user);
    const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
    const { password,isAdmin,confirmPassword,IsSuperAdmin, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: UserEntity): Promise<Partial<UserEntity>> {
    try {
      await this.userRepository.update(id, user);
      const updatedUser = await this.userRepository.findOneBy({ id });
      const { password, ...userNoPassword } = updatedUser;
      return userNoPassword;
    } catch (error) {
      return error;
    }
  }
  async deleteUser(id: string): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.remove(user); // delete o remove son los mismo
    const { password,isAdmin,confirmPassword,IsSuperAdmin, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUsersByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async makeAdmin(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    user.IsSuperAdmin = true;
    user.isAdmin = true;
    const { password,isAdmin,confirmPassword,IsSuperAdmin, ...userNoPassword } = user;
    await this.userRepository.save(user);
    return userNoPassword;

  }
}
