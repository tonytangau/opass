import '../utils/loadEnv'; 
import { Client } from 'pg';

export const createDatabaseIfNotExists = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres', // Connect to the default database
  });

  try {
    await client.connect();
    const dbName = process.env.POSTGRES_DB;
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    
    if (result.rowCount === 0) {
    // For both dev and test environments, we create the database if it doesn't exist
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database '${dbName}' created successfully!`);
    } else {
      console.log(`Database '${dbName}' already exists.`);
    }
  } catch (error) {
    console.error('Error during database creation:', error);
    throw error;
  } finally {
    await client.end();
  }
};
