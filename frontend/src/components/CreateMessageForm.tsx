import { ArrowRight, LoaderCircle } from "lucide-react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { createMessage } from "../http/createMessage"
import { useState } from "react"

export function CreateMessageForm() {
  const { roomId } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageAction(data: FormData) {
    const message = data.get('message')?.toString()

    if (!message || !roomId) {
      return
    }

    setIsLoading(true)
    createMessage({ message, roomId })
      .catch(() => {
        toast.error('Falha ao enviar pergunta, tente novamente!')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form
      action={createMessageAction}
      className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
    >
      <input
        type="text"
        name="message"
        placeholder="Qual a sua pergunta?"
        autoComplete="off"
        className="flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500"
        required
      />

      <button
        disabled={isLoading}
        type='submit'
        className='bg-orange-400 overflow-hidden text-orange-950 px-3 py-1.5 gap-1.5 flex items-center justify-center rounded-lg font-medium text-sm transition-all duration-500  hover:opacity-[.9] w-28'>
        {isLoading ? (
          <>
            <LoaderCircle className='animate-spin' size={20} />
          </>
        ) : (
          <>
            Criar sala
            <ArrowRight size={20} />
          </>
        )}
      </button>
    </form>
  )
}