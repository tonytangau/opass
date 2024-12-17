import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import app from '../example/app';

jest.mock('passport', () => {
  const originalModule = jest.requireActual('passport');
  return {
    ...originalModule,
    use: jest.fn(),
    initialize: () => (req: Request, res: Response, next: NextFunction) => {
      next(); // Middleware function: does nothing but continues
    },
    authenticate: () => (req: Request, res: Response, next: NextFunction) => {
      // Simulate Passport's OAuth2 callback with a mock user
      req.user = { id: '12345', email: 'mockuser@example.com' };
      next();
    },
  };
});

// describe('OAuth Login Flow', () => {
//   it('should redirect to Microsoft login page', async () => {
//     const response = await supertest(app).get('/auth/login');
//     expect(response.status).toBe(302);
//     expect(response.headers.location).toContain('login.microsoftonline.com');
//   });
// });

describe('JWT Token Test', () => {
  let token: string;

  it('should login and return a JWT token', async () => {
    // Simulate /auth/callback with mocked Passport.authenticate
    const response = await supertest(app).get('/auth/callback');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');

    // Extract token for further testing
    token = response.body.token;
    expect(typeof token).toBe('string');
  });

  it('should access protected route with valid JWT', async () => {
    const response = await supertest(app)
      .get('/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toEqual({
      id: '12345',
      email: 'mockuser@example.com',
    });
  });

  it('should reject access to protected route with invalid JWT', async () => {
    const response = await supertest(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidToken');
  
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: Invalid token');
  });

  it('should reject access if token payload is missing user', async () => {
    const invalidPayloadToken = jwt.sign({}, process.env.JWT_SECRET || 'secure_jwt_secret');
  
    const response = await supertest(app)
      .get('/protected')
      .set('Authorization', `Bearer ${invalidPayloadToken}`);
  
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden: Invalid token payload');
  });
});
