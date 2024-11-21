import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
  // Load appropriate environment file based on NODE_ENV
  if (process.env.NODE_ENV === 'test') {
    const envPath = path.resolve(__dirname, '../.env.test');
    dotenv.config({ path: envPath });
  } else {
    dotenv.config();
  }
};

loadEnv();
