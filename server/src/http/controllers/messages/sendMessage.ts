import { prisma } from '@/lib/prisma'
import { message } from '@/utils/messages-pub-sub'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export const sendMessageToRoom = async (request: FastifyRequest, reply: FastifyReply) => {
  const sendMessageParams = z.object({
    roomId: z.string()
  })

  const sendMessageBody = z.object({
    content: z.string()
  })

  try {
    const { roomId } = sendMessageParams.parse(request.params)
    const dataMessage = sendMessageBody.parse(request.body)

    const data = await prisma.message.create({
      data: {
        content: dataMessage.content,
        room: {
          connect: { id: roomId }
        }
      },
      select: {
        id: true,
        roomId: true
      }
    })

    message.public(roomId, {
      kind: 'message_created',
      value: {
        id: data.id,
        content: dataMessage.content
      }
    })
    return reply.status(200).send(data)
  } catch (error) {
    return reply.status(400).send(error)
  }
}