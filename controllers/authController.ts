import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    next(error); // Pass the error to the next middleware
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error('Error during login:', error);
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    const secret = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
    jwt.verify(refreshToken, secret, async (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        console.error('Invalid refresh token:', err);
        res.status(403).json({ message: 'Forbidden: Invalid refresh token' });
        return;
      }

      const { userId } = decoded as { userId: number };
      const userRepository = AppDataSource.getRepository(User);

      // Validate that the user exists
      const user = await userRepository.findOneBy({ id: userId });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secretkey',
        { expiresIn: '1h' }
      );

      res.status(200).json({ accessToken });
    });
  } catch (error) {
    console.error('Error during token refresh:', error);
    next(error);
  }
};
