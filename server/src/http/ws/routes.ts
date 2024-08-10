import { FastifyInstance } from 'fastify'
import { messageGet } from './messageReceived'

export const routesWs = async (route: FastifyInstance) => {
  route.get('', { websocket: true }, messageGet)
}