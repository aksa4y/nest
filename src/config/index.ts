import { DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './database';

interface iConfig {
  env: string;
  port: number;
  allowedOrigins: string[];
  database: DataSourceOptions;
  jwt: {
    secret: string;
    expiresIn: string;
    refreshExpiresIn: string;
  };
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalEnv(name: string, defaultValue: string = ''): string {
  return process.env[name] || defaultValue;
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map((o) => o.trim()),
  jwt: {
    secret: requireEnv('JWT_SECRET'), // Теперь используем JWT_SECRET
    expiresIn: optionalEnv('JWT_ACCESS_TOKEN_EXPIRES_IN', '1h'),
    refreshExpiresIn: optionalEnv('JWT_REFRESH_TOKEN_EXPIRES_IN', '7d'),
  },
  database: dataSourceOptions,
});
