import { Module } from '@nestjs/common';
import { AuthControllers } from './Auth.controller';
import { AuthServices } from './Auth.service';
import { UsersModule } from '../user/user.module';
import { UserEntity } from '../Entityes/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from '../order/order.module';
import { AuthRepository } from './Auth.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UsersModule, OrdersModule],
  controllers: [AuthControllers],
  providers: [AuthServices, AuthRepository, UserRepository],
})
export class AuthModule {}