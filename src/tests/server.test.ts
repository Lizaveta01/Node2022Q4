import request from 'supertest';
import { server } from '../index';
import { ErrorMessage } from '../models/constants';

const { NOT_ROUTE, NOT_USER, INVALID_ID, INVALID_BODY } = ErrorMessage;

afterEach(() => {
  server.close();
});

describe('API test', () => {
  describe('GET', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server).get('/api/users');
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({ users: [] });
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).get('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).get('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf84638');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('POST', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          username: 'Liza',
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(200);
    });
    it('should respond with a 200 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });
    it('should respond with a 200 status code', async () => {
      const response = await request(server).post('/api/users').send({
        username: 'Liza',
        age: 20,
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });
    it('should respond with a 200 status code', async () => {
      const response = await request(server)
        .post('/api/users')
        .send({
          username: 'Liza',
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_BODY);
    });
  });

  describe('PUT', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server)
        .put('/api/users')
        .send({
          username: 'Liza',
          age: 20,
          hobbies: ['painting'],
        });
      expect(response.statusCode).toBe(200);
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).put('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).put('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf84638');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('DELETE', () => {
    it('should respond with a 200 status code', async () => {
      const response = await request(server).delete('/api/users');
      expect(response.statusCode).toBe(200);
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).delete('/api/users/ukrthgff');
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(INVALID_ID);
    });

    it('should respond with a 200 status code', async () => {
      const response = await request(server).delete('/api/users/5c4bdc51-61c7-47d2-bfe6-d176cdf84638');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_USER);
    });
  });

  describe('Common', () => {
    it('should respond with a 404 status code', async () => {
      const response = await request(server).get('/api/useefwewef');
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(NOT_ROUTE);
    });
  });
});
