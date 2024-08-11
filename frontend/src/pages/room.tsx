import { useParams } from 'react-router-dom'
import amaLogo from '../assets/images/logo-home.svg'
import { LoaderCircle, Share2 } from 'lucide-react'
import { CreateMessageForm } from '../components/CreateMessageForm'
import { Suspense } from 'react'
import { Messages } from '../components/Messages'
import { toast } from 'sonner'

export const Room = () => {
  const { roomId } = useParams<{ roomId: string }>()

  const handleShareRoom = () => {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)
        .then(() => toast.success('Cópiado com sucesso!'))
        .catch(err => toast.error(err))
    }
  }

  const loader = () => {
    return (
      <div className='w-full flex items-center justify-center text-orange-500'>
        <LoaderCircle className='animate-spin' size={30} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Código da sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <CreateMessageForm />

      <Suspense fallback={loader()}>
        <Messages />
      </Suspense>
    </div>
  )
}