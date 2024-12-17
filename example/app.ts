import express from 'express';
import passport from 'passport';
import 'dotenv/config';
import authRoutes from './routes/authRoutes';
import { jwtMiddleware } from '../src/middleware/authMiddleware';

const app = express();

// Passport initialization
app.use(passport.initialize());

// Routes
app.use('/auth', authRoutes);

// Protected Route
app.get('/protected', jwtMiddleware, (req, res) => {
  res.json({ message: 'Access granted to protected resource!', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}. \nUse http://localhost:${PORT}/auth/login to get user token.`);
});

export default app;
