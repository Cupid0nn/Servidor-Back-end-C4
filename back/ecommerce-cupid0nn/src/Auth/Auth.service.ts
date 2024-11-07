import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { UserEntity } from 'src/Entityes/User.entity';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/user/user.enum';

@Injectable()
export class AuthServices {
  constructor(
    private readonly userRespository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  GetAuth(): string {
    return 'Get Auth';
  }
  async singin(email: string, password: string) {
    if (!email || !password) return 'Data Required';

    // verificar que el usuario exista

    const user = await this.userRespository.getUsersByEmail(email);

    if (!user)
      throw new BadRequestException(`user with email ${email} not found`);

    // comparacion de contraseñas
    const validPassword = await bycrypt.compare(password, user.password);

    if (!validPassword) throw new BadRequestException('invalid credentials');

    // firmar el token 
  
    const payload = {
      id: user.id,
      email: user.email,
      role: user.IsSuperAdmin ? Role.SuperAdmin : user.isAdmin ? Role.Admin : Role.User
    };
   

    // generamos el token

    const token = this.jwtService.sign(payload);

    // y ahora devolver la respuesta

    return {
      message: 'login successful',
      token,
    };
  }

  async signup(user: Partial<UserEntity>) {
    const { email, password } = user;
    // verificamos que el mail esta en la db
    const foundUser = await this.userRespository.getUsersByEmail(email);
    if (foundUser) throw new BadRequestException('mail already registered');

    // proceso de registro
    // hash de contraseña
    const hashedPassword = await bycrypt.hash(password, 10);
    // luego hay que guarardar en la db
    return await this.userRespository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
