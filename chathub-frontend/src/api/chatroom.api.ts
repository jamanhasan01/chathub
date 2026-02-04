import api from '@/lib/axios'

interface ISendMsg {
  roomId: string
  content: string
}

export const chatRoom = async (payload: string) => {
  const openRoom = await api.post('/chat/room', { id:payload })
  console.log('room ',openRoom.data);
  
  console.log('api call ', openRoom.data)

  return openRoom.data
}
export const getMessages = async (payload: string) => {
  const messages = await api.get(`/chat/message/${payload}`)
  return messages.data
}
export const createMessage = async (payload: ISendMsg) => {
  const message = await api.post('/chat/message', payload)
  console.log('log form class room create message' ,message.data);
  
  return message.data
}
