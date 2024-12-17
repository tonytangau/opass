import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
      accessToken?: string;
      refreshToken?: string;
    }

    // Attach to Request
    interface Request {
      user?: User;
    }
  }
}
