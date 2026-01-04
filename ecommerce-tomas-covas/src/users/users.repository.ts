import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      skip: skip,
      take: limit,
    });
    return users.map(
      ({ password, isAdmin, ...userNoPassword }) => userNoPassword,
    );
  }

  async getUserById(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    const { password, isAdmin, ...filteredUser } = user;
    return filteredUser;
  }

  async addUser(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({
      id: newUser.id,
    });
    if (!dbUser) {
      throw new InternalServerErrorException(
        'Error al buscar el usuario creado',
      );
    }
    const { password, isAdmin, ...filteredUser } = dbUser;
    return filteredUser;
  }

  async updateUser(id: string, user: Partial<Users>) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    if (!updatedUser)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    const { password, isAdmin, ...filteredUser } = updatedUser;
    return filteredUser;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    await this.usersRepository.remove(user);
    const { password, isAdmin, ...filteredUser } = user;
    return filteredUser;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
