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
  await AppDataSource.synchronize(true);
});

describe('Auth Routes Integration Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not allow duplicate registration', async () => {
    // Register the user initially
    await request(app)
      .post('/auth/register')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    // Try registering the same user again
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login an existing user', async () => {
    // Register the user first
    await request(app)
      .post('/auth/register')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    // Login with the registered user
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not allow login with incorrect password', async () => {
    // Register the user first
    await request(app)
      .post('/auth/register')
      .send({
        email: 'integrationtest@example.com',
        password: 'password123',
      });

    // Attempt to login with an incorrect password
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'integrationtest@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid email or password');
  });

  it('should not allow login with non-existent user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid email or password');
  });
});