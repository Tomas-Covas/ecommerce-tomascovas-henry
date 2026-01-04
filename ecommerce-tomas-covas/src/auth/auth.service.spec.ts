/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockImplementation(async () => true),
  hash: jest.fn().mockImplementation(async (password) => password),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let jewServiceMock: Partial<JwtService>;
  let usersRepositoryMock: Partial<UsersRepository>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            getUserByEmail: jest.fn(),
          },
        },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
    jewServiceMock = module.get<JwtService>(JwtService);
    usersRepositoryMock = module.get<UsersRepository>(UsersRepository);
  });

  it('Debe estar definido', () => {
    expect(authService).toBeDefined();
  });

  it('Debe llamar a getUserByEmail desde signIn', async () => {
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue({
      email: 'test@test.com',
      password: await bcrypt.hash('password', 10),
    });
    (jewServiceMock.sign as jest.Mock).mockReturnValue('mockedToken');
    const result = await authService.signIn('test@test.com', 'password');

    expect(usersRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      'test@test.com',
    );
    expect(result.token).toBe('mockedToken');
  });
});
