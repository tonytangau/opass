import request from 'supertest';
import { app, AppDataSource } from '../app';
import { createDatabaseIfNotExists } from '../utils/databaseUtils';

beforeAll(async () => {
  try {
    await createDatabaseIfNotExists();
    await AppDataSource.initialize();
    console.log("Test database connected successfully.");
  } catch (error) {
    console.error("Error initializing test database:", error);
  }
});

afterAll(async () => {
  await AppDataSource.destroy();
});

beforeEach(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.synchronize(true);
});

describe('User Routes Integration Tests', () => {
  it('should fetch user profile with valid JWT', async () => {

    await request(app)
    .post('/auth/register')
    .send({
      email: 'protectedtest@example.com',
      password: 'password123',
    });

    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'protectedtest@example.com',
        password: 'password123',
      });

    const validToken = loginRes.body.accessToken;

    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('email', 'protectedtest@example.com');
  });

  it('should deny access to user profile with no JWT', async () => {
    const res = await request(app).get('/profile');

    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Unauthorized: No token provided');
  });

  it('should deny access to user profile with invalid JWT', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer invalidtoken')

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toBe('Forbidden: Invalid token');
  });
});
