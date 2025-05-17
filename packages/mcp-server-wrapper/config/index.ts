import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  SERVER_NAME: z.string().default('mcp-server'),
  SERVER_VERSION: z.string().default('1.0.0'),
});

type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(): EnvConfig {
  const config = envSchema.parse(process.env);
  return config;
}

export const config = validateEnv();

export const serverConfig = {
  name: config.SERVER_NAME,
  version: config.SERVER_VERSION,
} as const;
