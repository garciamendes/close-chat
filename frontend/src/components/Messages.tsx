import { useParams } from "react-router-dom";
import { Message } from "./Message";
import { getRoomMessages } from "../http/getRoomMessages";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMessagesWebSockets } from "../hooks/useMessageWebSockets";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  useMessagesWebSockets({ roomId })

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