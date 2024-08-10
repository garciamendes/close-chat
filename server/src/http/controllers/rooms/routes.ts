import { FastifyInstance } from "fastify"
import { createRoom } from "./createRoom"

export const routesRooms = async (route: FastifyInstance) => {
  route.post('', createRoom)
}