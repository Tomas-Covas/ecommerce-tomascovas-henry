import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth/enums/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
