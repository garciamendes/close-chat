import { useParams } from "react-router-dom"
import { Message } from "./Message"
import { getRoomMessages, IMessage } from "../http/getRoomMessages"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/useMessageWebSockets";
import { useEffect } from "react";

export function Messages() {
  const { roomId } = useParams()
  const queryClient = useQueryClient()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }


  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  const { kindMesage } = useMessagesWebSockets({ roomId })

  useEffect(() => {
    if (!kindMesage.id) return

    queryClient.setQueryData(['messages', roomId], (state: IMessage[]) => {
      const newMessage: Partial<IMessage> = {
        id: kindMesage.id,
        content: kindMesage.content,
        reactionCount: 0,
        answered: false,
      }

      return [newMessage, ...state]
    })

  }, [kindMesage, queryClient, roomId])

  const sortedMessages = data.sort((a, b) => {
    return b.reactionCount - a.reactionCount
  })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages.map(message => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.content}
            amountOfReactions={message.reactionCount}
            answered={message.answered}
          />
        )
      })}
    </ol>
  )
}