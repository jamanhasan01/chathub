import { Search } from 'lucide-react'
import { Logo } from './Logo'
import { getAllUser, type IApiError } from '@/api/auth.api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChatUserItem } from '../ui/ChatUserItem'
import type { IUser, IUserResponse } from '@/types/user.types'
import { chatRoom } from '@/api/chatroom.api'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router'

export const Aside = () => {
  const navigate = useNavigate()
  
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<IUserResponse, Error, IUser[]>({
    queryKey: ['users'],
    queryFn: getAllUser,
    select: (res) => res.data,
  })

  const openRoomMutation = useMutation({
    mutationFn: chatRoom,
    onSuccess: ({ data }) => {
      navigate(`/chat/room/${data._id}`)
    },
    onError: (error: AxiosError<IApiError>) => {
      toast.error(error.response?.data?.message ?? 'Failed to open room')
    },
  })

  const handleGetId = (data: IUser) => {
    openRoomMutation.mutate(data._id)
  }

  return (
    <aside className="w-72 h-full flex flex-col border-r border-gray-200 bg-white">
      <div className="p-6">
        <Logo />

        <div className="mt-8 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-blue transition-colors" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm 
                     focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all
                     placeholder:text-gray-400"
          />
        </div>
      </div>
      
      <div className="px-3 py-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Contacts
        </h3>
      </div>
      
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
        {isLoading && (
          <div className="px-3 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-2 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="px-3 py-4">
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              Failed to load users
            </p>
          </div>
        )}

        {users?.length === 0 && (
          <div className="px-3 py-8 text-center">
            <p className="text-sm text-gray-500">No contacts found</p>
          </div>
        )}

        {users?.map((user) => (
          <ChatUserItem key={user._id} user={user} onClick={handleGetId} />
        ))}
      </nav>
    </aside>
  )
}