import { message } from '@/utils/messages-pub-sub'
import { WebSocket } from '@fastify/websocket'
import { FastifyRequest } from 'fastify'
import z from 'zod'

export const messageGet = async (conn: WebSocket, request: FastifyRequest) => {
  const messageGetParam = z.object({
    roomId: z.string()
  })

  const { roomId } = messageGetParam.parse(request.params)

  message.subscribe(roomId, message => {
    conn.send(JSON.stringify(message))
  })
}