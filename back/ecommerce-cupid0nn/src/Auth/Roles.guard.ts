import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { Roles } from 'src/decorator/Roles.decorator';
import { Role } from 'src/user/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // aqui injectamos el reflector de nestjs que leera y extraera la metadata
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requieredRoles = this.reflector.getAllAndOverride<Role[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () =>
      requieredRoles.some((role) => user?.role?.includes(role)); // aqui verificamos si el usuario tiene algun rol "por eso el some" y sino se va a al manejo de errores

    const valid = hasRole();

    if (!valid)
      throw new ForbiddenException('You dont have acess at this endpoint');

    return valid;
  }
}
