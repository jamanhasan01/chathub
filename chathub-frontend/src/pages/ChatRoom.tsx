import { Send, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createMessage, getMessages } from '@/api/chatroom.api'
import { useNavigate, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
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
  const navigate = useNavigate()
  /* =============================== Scroll Ref ================================ */
  const bottomRef = useRef<HTMLDivElement | null>(null)

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
    if (!roomId || !myUserId) navigate('/login')

    socket.emit('join-room', roomId)

    const handler = (msg: IMessage) => {
      queryClient.setQueryData<IMessage[]>(['messages', roomId], (old) => {
        const safeOld = old ?? []

        if (safeOld.some((m) => m._id === msg._id)) return safeOld

        return [...safeOld, msg]
      })
    }

    socket.on('new-message', handler)

    return () => {
      socket.off('new-message', handler)
    }
  }, [roomId, queryClient])

  /* =============================== Auto Scroll ================================ */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* =============================== Header ================================ */}
      <div className="h-16 px-4 lg:px-6 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">General Channel</p>
            <span className="text-xs text-muted-foreground">{messages.length} messages</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="lg:flex hidden">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* =============================== Messages Area ================================ */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 space-y-4 pb-28 lg:pb-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground text-center">Loading messages…</p>
        )}

        {!isLoading && messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isMine = msg.sender._id === myUserId

          return (
            <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'items-start gap-2'}`}>
              {!isMine && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {msg.sender.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col max-w-[80%]">
                {!isMine && (
                  <span className="text-xs font-medium mb-1 ml-1">{msg.sender.name || 'User'}</span>
                )}

                <div
                  className={`px-4 py-2 rounded-xl text-sm ${
                    isMine
                      ? 'bg-brand-blue text-white rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>

                <span
                  className={`text-xs text-muted-foreground mt-1 ${isMine ? 'text-right' : 'ml-1'}`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          )
        })}

        {/* =============================== Scroll Anchor ================================ */}
        <div ref={bottomRef} />
      </div>

      {/* =============================== Message Input ================================ */}
      <div className="fixed bottom-16 left-0 right-0 lg:static lg:bottom-auto p-4 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <Input
            placeholder="Type a message..."
            className="flex-1 rounded-xl bg-white/5 border-border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />

          <Button
            size="icon"
            className="rounded-xl bg-brand-blue hover:bg-brand-blue/90"
            onClick={handleSend}
            disabled={messageMutation.isPending || !message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom
