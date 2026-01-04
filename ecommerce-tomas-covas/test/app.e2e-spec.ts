import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('Get /users/ Devuele un error debido a que no hay token con un estatus 401', async () => {
    const req = await request(app.getHttpServer()).get('/users').expect(401);
    console.log(req.body);
    expect(req.body).toEqual({
      statusCode: 401,
      message: 'No se ha enviado el token',
      error: 'Unauthorized',
    });
  });
  it('Get /products/ Devuele un error debido a que no hay token con un estatus 401', async () => {
    const req = await request(app.getHttpServer()).get('/products').expect(401);
    console.log(req.body);
    expect(req.body).toEqual({
      statusCode: 401,
      message: 'No se ha enviado el token',
      error: 'Unauthorized',
    });
  });
});
