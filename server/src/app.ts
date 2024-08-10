import fastifyCors from '@fastify/cors'
import Fastify from 'fastify'
import fastifyWebsocket from '@fastify/websocket'
import { ZodError } from 'zod'
import { env } from '@/envs'
import { routesRooms } from './http/controllers/rooms/routes'
import { routesMessages } from './http/controllers/messages/routes'

export const fastify = Fastify()

fastify.register(fastifyCors, {
  origin: env.ALLOW_CORS
})
fastify.register(fastifyWebsocket)

fastify.register(routesRooms, { prefix: '/rooms' })
fastify.register(routesMessages, { prefix: '/:roomId/messages' })

fastify.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.send({ message: 'Validation error:', issues: err.issues }).status(400)
  }

  if (env.NODE_ENV !== 'production') console.error(err)

  return reply.status(500).send({ message: 'Internal server error' })
})