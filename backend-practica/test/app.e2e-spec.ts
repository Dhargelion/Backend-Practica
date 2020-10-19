import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as mongoose from 'mongoose';
import { CreateUserDTO } from 'src/user/dto/user.dto';

const mong = "mongodb://localhost/users_CRUD"

beforeAll(async () => {
  await mongoose.connect(mong);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
})


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('List Users!');
  });
});



describe('CRUD usuarios', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  const resGet = {
    "message": "Users",
    "users": []
  };
  const user = {
    name: "diego",
    age: "23",
    email: "dcv@gmail.com"
  };
  const userID = '5f8caaa79cefc34834562c83'

  it('/allUsers (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/allUsers')
      .expect(200).expect(({ body }) => {
        expect(body).toEqual(resGet)
      });
  });

  it('/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/create').send(user)
      .expect(200).expect(({ body }) => {
        expect(body.message).toEqual('User Created'),
          expect(body.user.name).toEqual(user.name),
          expect(body.user.age).toEqual(23),
          expect(body.user.email).toEqual(user.email)
      });
  });

  it('/delete (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user/delete?userID=').send(userID)
      .expect(200).expect(({ body }) => {
        expect(body.message).toEqual('user deleted')
      });
  });

});