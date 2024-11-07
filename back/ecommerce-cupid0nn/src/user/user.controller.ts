import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  Param,
  Query,
  Body,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/Auth.guard';
import { UserDbServices } from './user.dbService';
import { CreateUserDto } from 'src/DTOs/CreateUserDto ';
import { Roles } from 'src/decorator/Roles.decorator';
import { Role } from './user.enum';
import { RolesGuard } from 'src/Auth/Roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { parse } from 'path';

@ApiTags('User')
@Controller('users') //<-- luego de declarar la ruta le digo como se exporta
export class UsersControllers {
  constructor(
    private readonly usersService: UserService,
    private readonly UserDbServices: UserDbServices,
  ) {} //<-- afuera de aqui le digo controladores tiene
  @ApiBearerAuth()
  @HttpCode(200) // de esta forma elejimos el status code
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin) // es como recibir esto Roles : ['Admin']
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.usersService.getUsers(1, 10);
  }
  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard) // requiere el authorization
  getUserByid(@Param('id', ParseUUIDPipe) id: string) {
    // debo parasarselos de manera string por param
    return this.usersService.getUser(id);
  }
  @ApiBearerAuth()
  @HttpCode(200)
  @Put(':id')
  @Roles(Role.SuperAdmin)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }
  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id/admin')
  @UseGuards(AuthGuard)
  makeAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.makeAdmin(id);
  }
}
