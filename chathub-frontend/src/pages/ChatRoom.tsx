import { Send, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMessage, getMessages } from '@/api/chatroom.api'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { getMe, type ApiResponse } from '@/api/auth.api'
import type { IUser } from '@/types/user.types'
import { socket } from '@/api/socket.api'

/* =============================== Types ================================ */
interface IMessageSender {
  _id: string
  name: string
  email: string
}
interface IMessage {
  _id: string
  content: string
  room: string
  sender: IMessageSender
  createdAt: string
}

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>()
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  /* =============================== Get Me ================================ */
  const { data: myUserId } = useQuery<ApiResponse<IUser>, Error, string>({
    queryKey: ['me'],
    queryFn: getMe,
    select: (res) => {
      if (!res.data) throw new Error('User not found')
      return res.data._id
    },
  })

  /* =============================== Get Messages ================================ */
  const { data: messages = [], isLoading } = useQuery<IMessage[]>({
    queryKey: ['messages', roomId],
    queryFn: () => getMessages(roomId!),
    enabled: !!roomId,
  })

  console.log('user id ', messages)

  /* =============================== Send Message ================================ */
  const messageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      setMessage('')
    },
  })

  /* =============================== Send Handler ================================ */
  const handleSend = () => {
    if (!message.trim() || !roomId) return

    messageMutation.mutate({
      roomId,
      content: message,
    })
  }

  /* =============================== Socket Listener ================================ */
  useEffect(() => {
    if (!roomId) return

    socket.emit('join-room', roomId)

    const handler = (msg: IMessage) => {
      queryClient.setQueryData<IMessage[]>(['messages', roomId], (old) => {
        const safeOld = old ?? []

        // prevent duplicate message
        if (safeOld.some((m) => m._id === msg._id)) {
          return safeOld
        }
        console.log('safeOld ', safeOld)
        return [...safeOld, msg]
      })
    }

    socket.on('new-message', handler)

    return () => {
      socket.off('new-message', handler)
    }
  }, [roomId, queryClient])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* =============================== Header ================================ */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Chat</p>
            <span className="text-xs text-muted-foreground">{messages.length} messages</span>
          </div>
        </div>

        <Button variant="ghost" size="icon">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* =============================== Messages ================================ */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading messages…</p>}

        {!isLoading && messages.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet</p>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender._id === myUserId

          return (
            <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'items-start gap-2'}`}>
              {!isMine && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                  isMine ? 'bg-brand-blue text-white' : 'bg-muted text-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        })}
      </div>

      {/* =============================== Message Input ================================ */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            className="rounded-xl"
            onClick={handleSend}
            disabled={messageMutation.isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
