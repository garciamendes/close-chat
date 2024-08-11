import { FastifyInstance } from "fastify"
import { sendMessageToRoom } from "./sendMessage"
import { getMessages } from "./getMessages"
import { addReactionMessage } from "./addReaction"
import { deleteReactionMessage } from "./deleteReactionMessage"

export const routesMessages = async (route: FastifyInstance) => {
  route.get('', getMessages)
  route.post('', sendMessageToRoom)
  route.patch('/react/:messageId', addReactionMessage)
  route.delete('/react/:messageId', deleteReactionMessage)
}