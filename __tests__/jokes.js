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
  it('GET jokes error', async () => {
    const res = await supertest(server).get('/api/jokes');
    expect(res.statusCode).toBe(401);
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8');
    console.log(res.body);
    expect(res.body).toEqual({ you: 'shall not pass!' });
  });

  it('GET jokes with token', async () => {
    await supertest(server).post('/api/auth/register').send({
      username: 'mary',
      password: 'password',
    });
    const response = await supertest(server).post('/api/auth/login').send({
      username: 'mary',
      password: 'password',
    });
    let token = response.body.token;
    if (token !== undefined) {
      const res = await supertest(server).get('/jokes').send({ token: token });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    }
  });
});
