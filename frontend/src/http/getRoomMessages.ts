export interface IGetMessageParams {
  roomId: string
}

export interface IMessage {
  id: string
  content: string
  reactionCount: number
  answered: boolean
  createdAt: string | Date
  updatedAt: string | Date
}

export const getRoomMessages = async ({ roomId }: IGetMessageParams) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/${roomId}/messages`)

  const data: Array<IMessage> = await response.json()
  return data
}