import { env } from '@/envs'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()