import { FastifyInstance } from "fastify"
import { sendMessageToRoom } from "./sendMessage"
import { getMessages } from "./getMessages"

export const routesMessages = async (route: FastifyInstance) => {
  route.get('', getMessages)
  route.post('', sendMessageToRoom)
}