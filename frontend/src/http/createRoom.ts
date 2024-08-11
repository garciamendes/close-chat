export interface ICreateRoom {
  theme: string
}

export interface IRoom {
  id: string
  theme: string
}

export const createRoom = async ({ theme }: ICreateRoom) => {

  const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/rooms`, {
    method: 'POST',
    body: JSON.stringify({ theme }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  const data: IRoom = await response.json()
  return data
}