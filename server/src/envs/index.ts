import dontenv from 'dotenv-safe'
import { z } from 'zod'

dontenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  WS_DATABASE_PORT: z.coerce.number().default(5432),
  WS_DATABASE_USER: z.string(),
  WS_DATABASE_PASSWORD: z.string(),
  WS_DATABASE_NAME: z.string(),
  ALLOW_CORS: z.string(),
  DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)
if (!_env.success) {
  console.error('Invalid environment variables: ', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data