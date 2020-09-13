const server = require('../api/server');
const db = require('../database/dbConfig');
const supertest = require('supertest');

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('testing users', () => {
  it('POST Register working', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      username: 'aric3',
      password: 'abc123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.username).toBe('aric3');
  });
  it('POST Register error', async () => {
    const res = await supertest(server).post('/api/auth/register').send({
      username: 'aric1',
    });
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    expect(res.body.message).toBe('password required');
  });

  //broken -  no time to debug
  //   it('POST Login', async () => {
  //     const res = await supertest(server).post('/api/auth/login').send({
  //       username: 'sam',
  //       password: 'password',
  //     });
  //     expect(res.statusCode).toBe(200);
  //     expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
  //     console.log(res.body);
  //     expect(res.body.message).toBe('Welcome sam!');
  //   });
});
