import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routeRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass,
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.roles) {
      throw new UnauthorizedException('Usuario sin roles');
    }
    const userRoles = user.roles;
    const hasRole = () => routeRoles.some((role) => userRoles.includes(role));
    const valid = user.roles && hasRole();
    if (!valid) {
      throw new UnauthorizedException('No tiene permisos para acceder');
    }
    return true;
  }
}
