import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export const getMessages = async (request: FastifyRequest, reply: FastifyReply) => {
  const sendMessageParams = z.object({
    roomId: z.string()
  })

  try {
    const { roomId } = sendMessageParams.parse(request.params)

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        content: true,
        answered: true,
        reactionCount: true,
        roomId: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return reply.status(200).send(messages)
  } catch (error) {
    return reply.status(400).send(error)
  }
}