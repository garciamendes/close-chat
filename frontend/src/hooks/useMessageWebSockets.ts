import { useEffect, useState } from "react";

export interface IMessageWebSocketProps {
  roomId: string
}

export interface IMesagePubSubSocket {
  id: string
  content: string
}

export interface IResponsePubSubSocket<T> {
  kind: string
  value: T
}

export const useMessagesWebSockets = ({ roomId }: IMessageWebSocketProps) => {
  const [dataMessage, setDataMessage] = useState<IMesagePubSubSocket>({ id: '', content: '' })

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:3333/api/${roomId}`)

    ws.onopen = () => {
      console.log(`Connected to WebSocket server at ws://localhost:3333/api/${roomId}`)
    }

    ws.onmessage = (event) => {
      const { kind }: IResponsePubSubSocket<unknown> = JSON.parse(event.data)

      switch (kind) {
        case 'message_created':
          handlemessage(JSON.parse(event.data))
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
  }, [roomId])

  function handlemessage(data: object) {
    const { value } = data as IResponsePubSubSocket<IMesagePubSubSocket>
    setDataMessage(value)
  }

  return {
    'kindMesage': dataMessage
  }
}