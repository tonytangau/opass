import express from 'express';
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './config/ormconfig';

const app = express();

app.use(express.json());

// Use authentication routes
app.use('/auth', authRoutes);

export { app, AppDataSource };
