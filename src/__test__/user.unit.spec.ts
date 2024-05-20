import request from 'supertest';
import App from '../shared/app';
const app = new App().getApp();

describe('Auth', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should create a user successfully', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);

      expect(status).toBe(201);
      expect(body.data.id).toBeTruthy();
    });

    it('should fail with password validation error', async () => {
      const mockUser = {
        password: 'Temitope12',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should fail with email validation error', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope33',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should return an error while a user attribute missing', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
      };

      const { status, body } = await request(app).post('/api/v1/auth/register').send(mockUser);

      expect(status).toBe(400);
      expect(body.message).toMatch('"email" is required');
      expect(body.success).toBeFalsy();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    const mockUser = {
      password: 'Temitope12@#',
      first_name: 'Temitope',
      last_name: 'Julius',
      email: 'temitope@gmail.com',
    };
    it('should log a user in successfully.', async () => {
      const loginCredential = {
        password: 'Temitope12@#',
        email: 'temitope@gmail.com',
      };

      await request(app).post('/api/v1/auth/register').send(mockUser);

      const { status, body } = await request(app).post('/api/v1/auth/login').send(loginCredential);

      expect(status).toBe(200);
      expect(body.data.access_token).toBeTruthy();
      expect(body.success).toBeTruthy();
    });

    it('should unauthorize a login with incorrect credentials.', async () => {
      await request(app).post('/api/v1/auth/register').send(mockUser);
      const loginCredential = {
        password: 'Temitope1#',
        email: 'temitope@gmail.com',
      };

      const { status, body } = await request(app).post('/api/v1/auth/login').send(loginCredential);

      expect(status).toBe(401);
      expect(body.success).toBeFalsy();
    });

    it('should fail with password validation error', async () => {
      const mockUser = {
        password: 'Temitope12',
        email: 'temitope@gmail.com',
      };
      await request(app).post('/api/v1/auth/register').send(mockUser);

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should fail with email validation error', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        email: 'temitope33',
      };
      await request(app).post('/api/v1/auth/register').send(mockUser);

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);

      expect(status).toBe(400);
      expect(body.success).toBeFalsy();
    });

    it('should return an error while a user attribute missing', async () => {
      const mockUser = {
        password: 'Temitope12@#',
      };

      const { status, body } = await request(app).post('/api/v1/auth/login').send(mockUser);

      expect(status).toBe(400);
      expect(body.message).toMatch('"email" is required');
      expect(body.success).toBeFalsy();
    });
  });
});
