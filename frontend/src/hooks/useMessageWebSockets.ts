import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { IMessage } from "../http/getRoomMessages";

export interface IMessageWebSocketProps {
  roomId: string
  messageId?: string
}

enum Kind {
  MESSAGE_CREATED = 'message_created',
  MESSAGE_REACTION_ADDED = 'message_add_reaction',
  MESSAGE_REACTION_REMOVED = 'message_remove_reaction'
}

type WebhookMessage =
  | { kind: Kind.MESSAGE_CREATED; value: { id: string, content: string } }
  | { kind: Kind.MESSAGE_REACTION_ADDED; value: { id: string; reactionCount: number | null } }
  | { kind: Kind.MESSAGE_REACTION_REMOVED; value: { id: string; reactionCount: number | null } };

export const useMessagesWebSockets = ({ roomId, messageId }: IMessageWebSocketProps) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const url = messageId ? `ws://localhost:3333/api/${roomId}/messages/${messageId}/react` : `ws://localhost:3333/api/${roomId}`
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log(`Connected to WebSocket server at ws://localhost:3333/api/${roomId}`)
    }

    ws.onmessage = (event) => {
      const { kind, value }: WebhookMessage = JSON.parse(event.data)

      switch (kind) {
        case Kind.MESSAGE_CREATED:
          queryClient.setQueryData(['messages', roomId], (state: IMessage[]) => {
            if (!state.length) return []

            const newMessage: Partial<IMessage> = {
              id: value.id,
              content: value.content,
              reactionCount: 0,
              answered: false,
            }

            return [newMessage, ...state]
          })
          break
        case Kind.MESSAGE_REACTION_ADDED:
        case Kind.MESSAGE_REACTION_REMOVED:
          queryClient.setQueryData(['messages', roomId], (state: IMessage[]) => {
            if (!state) {
              return undefined
            }

            return state.map(item => {
              if (item.id === value.id) {
                return { ...item, reactionCount: value.reactionCount }
              }

              return item
            })
          })
          break
        default:
          console.error(`Received unknown message kind: ${kind}`)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      ws.close()
    }
  }, [messageId, roomId, queryClient])
}