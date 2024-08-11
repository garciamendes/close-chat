import { ArrowRight, LoaderCircle } from 'lucide-react'
import LogoHomeSvg from '../assets/images/logo-home.svg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createRoom } from '../http/createRoom'
import { useState } from 'react'

export const CreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateRoom = (data: FormData) => {
    const theme = data.get('theme')?.toString()

    if (!theme) {
      toast.error('Por favor, informe um nome para a sala')
      return
    }

    setIsLoading(true)
    createRoom({ theme })
      .then((response) => {
        navigate(`/room/${response.id}`)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={LogoHomeSvg} alt='AMA' className='h-10' />

        <p className='leading-relaxed text-zinc-300 text-center'>
          Crie uma sala pública de AMA (Ask me anything) e priorize as perguntas mais importantes para a comunidade.
        </p>

        <form
          action={handleCreateRoom}
          className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>
          <input
            type='text'
            name='theme'
            placeholder='Nome da sala'
            autoComplete='off'
            className='flex-1 text-sm bg-transparent mx-2 outline-none text-zinc-100 placeholder:text-zinc-500' />

          <button
            disabled={isLoading}
            type='submit'
            data-loading={isLoading}
            className='bg-orange-400 overflow-hidden whitespace-nowrap text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-all duration-500  hover:opacity-[.9] w-28 data-[loading=true]:w-11'>
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
      </div>
    </div>
  )
}