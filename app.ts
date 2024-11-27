import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './config/ormconfig';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', userRoutes);

export { app, AppDataSource };
