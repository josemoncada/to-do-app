import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../modules/auth/entities/user.entity';
import { ToDo } from '../modules/to-do/entities/to-do.entity';
import path from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'to_do_app',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, ToDo],
  migrations: [path.join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  subscribers: [],
});

export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Error during Data Source initialization:', error);
    throw error;
  }
};
