import { Request, Response } from 'express';

export const getUserProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const user = req.user;
      res.status(200).json({ message: 'User profile', user });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  