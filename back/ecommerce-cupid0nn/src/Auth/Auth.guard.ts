import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/user/user.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // nos llega el token por el Header MUY IMPORTANTE

   

    const token = request.headers.authorization?.split(' ')[1]; // bearer = 0 y el token = 1
    // y recibimos algo asi = ['Bearer', 'token']
    if (!token)
      throw new UnauthorizedException(
        ' te falta el token papa, estos van en el header',
      );

    // intentamos validar el token primero
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret }); // aqui recibimos los datos de jwt

      payload.exp = new Date(payload.exp * 1000); // aqui recibimos la fecha de expiracion y la convertimos a date

      payload.iat = new Date(payload.iat * 1000); // aqui recibimos la fecha de creacion y la convertimos a date
      
      request.user = payload

      return true;

    } catch (error) {

      throw new UnauthorizedException('invalid token');
    }
  }
}
