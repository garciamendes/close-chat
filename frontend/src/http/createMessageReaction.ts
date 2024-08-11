export interface ICreateMessageReaction {
  roomId: string
  messageId: string
}

export const createMessageReaction = async ({ messageId, roomId }: ICreateMessageReaction) => {

  await fetch(`${import.meta.env.VITE_APP_API_URL}/api/${roomId}/messages/${messageId}`, {
    method: 'PATCH',
  })
}