import { FastifyInstance } from "fastify"
import { sendMessageToRoom } from "./sendMessage"

export const routesMessages = async (route: FastifyInstance) => {
  route.post('', sendMessageToRoom)
}