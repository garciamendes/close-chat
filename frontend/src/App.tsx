import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateRoom } from './pages/create-room'
import { Room } from './pages/room'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoom />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
])

export function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='bottom-right'  />
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}
