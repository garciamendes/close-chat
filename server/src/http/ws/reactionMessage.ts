import { reactionMessage } from '@/utils/add-reaction-message-pub-sub'
import { WebSocket } from '@fastify/websocket'
import { FastifyRequest } from 'fastify'
import z from 'zod'

export const reactionsMessage = async (conn: WebSocket, request: FastifyRequest) => {
  const messageGetParam = z.object({
    roomId: z.string(),
    messageId: z.string()
  })

  const { roomId, messageId } = messageGetParam.parse(request.params)

  reactionMessage.subscribe(roomId, data => {
    conn.send(JSON.stringify(data))
  })
}