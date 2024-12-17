import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secure_jwt_secret') as JwtPayload;
    if (!decoded.user) {
      res.status(403).json({ message: 'Forbidden: Invalid token payload' });
      return;
    }

    req.user = decoded.user; // Attach the decoded user to the request
    next(); // Call next() on success
  } catch (error) {
    res.status(403).json({ message: 'Forbidden: Invalid token' });
    return;
  }
};
