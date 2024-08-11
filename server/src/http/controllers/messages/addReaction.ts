import { prisma } from '@/lib/prisma'
import { reactionMessage } from '@/utils/add-reaction-message-pub-sub'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export const addReactionMessage = async (request: FastifyRequest, reply: FastifyReply) => {
  const sendMessageParams = z.object({
    roomId: z.string(),
    messageId: z.string()
  })

  try {
    const { roomId, messageId } = sendMessageParams.parse(request.params)

    const message = await prisma.message.update({
      where: { roomId, id: messageId },
      data: {
        reactionCount: { increment: 1 }
      },
      select: {
        id: true,
        reactionCount: true
      }
    })

    reactionMessage.public(roomId, {
      kind: 'message_add_reaction',
      value: {
        id: message.id,
        reactionCount: message.reactionCount
      }
    })
    return reply.status(200).send(message)
  } catch (error) {
    return reply.status(400).send(error)
  }
}