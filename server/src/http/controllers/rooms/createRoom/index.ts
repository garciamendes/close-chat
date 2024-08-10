import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export const createRoom = async (request: FastifyRequest, reply: FastifyReply) => {
  const createRoomBody = z.object({
    theme: z.string()
  })

  const { theme } = createRoomBody.parse(request.body)

  try {
    const room = await prisma.room.create({ data: { theme } })

    return reply.status(201).send(room)
  } catch (error) {
    return reply.status(400).send(error)
  }
}