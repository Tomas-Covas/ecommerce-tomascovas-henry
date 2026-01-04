import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '../users/entities/users.entity';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Partial<Users>) {
    const { email, password } = user;
    if (!email || !password) {
      throw new BadRequestException('Se necesitan email y password');
    }
    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email ya registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.addUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Se necesitan email y password');

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('Email o password incorrectos');
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      throw new BadRequestException('Email o password incorrectos');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logueado',
      token: token,
    };
  }
}
