export interface IDeleteMessageReaction {
  roomId: string
  messageId: string
}

export const removeMessageReaction = async ({ messageId, roomId }: IDeleteMessageReaction) => {

  await fetch(`${import.meta.env.VITE_APP_API_URL}/api/${roomId}/messages/${messageId}`, {
    method: 'DELETE',
  })
}