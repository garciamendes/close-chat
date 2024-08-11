type ReactionMessage = {
  kind: 'message_add_reaction' | 'message_remove_reaction',
  value: {
    id: string
    reactionCount: number
  }
}

type Subcriber = (reactionMessage: ReactionMessage) => void

class ReactionMessagePubSub {
  private channel: Record<string, Subcriber[]> = {}

  subscribe(roomId: string, subcriber: Subcriber) {
    if (!this.channel[roomId]) {
      this.channel[roomId] = []
    }

    this.channel[roomId].push(subcriber)
  }

  public(roomId: string, reactionMessage: ReactionMessage) {
    if (!this.channel[roomId])
      return

    for (const sub of this.channel[roomId]) {
      sub(reactionMessage)
    }
  }
}

export const reactionMessage = new ReactionMessagePubSub()