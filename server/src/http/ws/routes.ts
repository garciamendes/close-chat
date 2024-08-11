import { FastifyInstance } from 'fastify'
import { messageGet } from './messageReceived'
import { reactionsMessage } from './reactionMessage'

export const routesWs = async (route: FastifyInstance) => {
  route.get('', { websocket: true }, messageGet)
  route.get('/messages/:messageId/react', { websocket: true }, reactionsMessage)
}