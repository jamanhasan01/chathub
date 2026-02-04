import { Search } from 'lucide-react'
import { Logo } from './Logo'
import { getAllUser } from '@/api/auth.api'
import { useQuery } from '@tanstack/react-query'

import { ChatUserItem } from '../ui/ChatUserItem'
import type { IUser, IUserResponse } from '@/types/user.types'




export const Aside = () => {
/* =============================== react query ================================ */
const {
  data: users,
  isLoading,
  error,
} = useQuery <IUserResponse ,Error,IUser[]>({
  queryKey: ['users'],
  queryFn: getAllUser,
  select: (res) => res.data, // ✅ extract ALL users
});


const handleGetId=(data:IUser)=>{
  console.log(data);
  
}

  return (
    <aside className="w-72 h-full flex flex-col border-r border-border bg-background">
      <div className="p-6">
        <Logo />

        <div className="mt-8 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-brand-blue transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-border rounded-xl text-sm 
                     focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
          />
        </div>
      </div>
<nav className="flex-1 px-3 space-y-1 overflow-y-auto">
  {isLoading && (
    <p className="text-sm text-muted-foreground px-3">
      Loading users...
    </p>
  )}

  {error && (
    <p className="text-sm text-destructive px-3">
      Failed to load users
    </p>
  )}

  {users?.length === 0 && (
    <p className="text-sm text-muted-foreground px-3">
      No users found
    </p>
  )}

  {users?.map((user) => (
    <ChatUserItem
      key={user._id}
      user={user}
      onClick={handleGetId}
    />
  ))}
</nav>

    </aside>
  )
}
