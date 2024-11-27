import './utils/loadEnv';
import { app, AppDataSource } from './app';
import { createDatabaseIfNotExists } from './utils/databaseUtils';

const startServer = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();

    // Initialize TypeORM data source
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
