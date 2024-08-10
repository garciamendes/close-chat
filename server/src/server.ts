import { fastify } from '@/app'
import { env } from '@/envs'

fastify.listen({
  port: env.PORT,
  host: '0.0.0.0'
}).then(() => console.log('HTTP Server Running'))
