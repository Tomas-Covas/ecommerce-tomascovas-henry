import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../users/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  getUserById(id: string): Promise<Partial<Users>> {
    return this.usersRepository.getUserById(id);
  }
  createUser(user: Partial<Users>) {
    return this.usersRepository.addUser(user);
  }
  updateUser(id: string, user: Partial<Users>) {
    return this.usersRepository.updateUser(id, user);
  }
  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
