import { IMessage } from "./getRoomMessages"

export interface ICreateMessage {
  message: string
  roomId: string
}

export const createMessage = async ({ message, roomId }: ICreateMessage) => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/${roomId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content: message }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const data: IMessage = await response.json()
  return data
}