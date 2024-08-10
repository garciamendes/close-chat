type Message = {
  content: string
}

type Subcriber = (message: Message) => void

class MessagePubSub {
  private channel: Record<string, Subcriber[]> = {}

  subscribe(roomId: string, subcriber: Subcriber) {
    if (!this.channel[roomId]) {
      this.channel[roomId] = []
    }

    this.channel[roomId].push(subcriber)
  }

  public(roomId: string, message: Message) {
    if (!this.channel[roomId])
      return

    for (const sub of this.channel[roomId]) {
      sub(message)
    }
  }
}

export const message = new MessagePubSub()