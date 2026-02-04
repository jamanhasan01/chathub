/* =============================== chat user item ================================ */
import { cn } from '@/lib/utils';
import type { IUser } from '@/types/user.types';

interface ChatUserItemProps {
  user: IUser;
  isActive?: boolean;
  onClick: (user: IUser) => void; // ✅ ADD THIS
}

export const ChatUserItem = ({ user, isActive ,onClick}: ChatUserItemProps) => {


  return (
    <div
    onClick={()=>onClick(user)}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition',
        isActive
          ? 'bg-brand-blue/10'
          : 'hover:bg-muted'
      )}
    >
      {/* =============================== avatar ================================ */}
      <div className="relative">
        <img
            src={user.image || '/avatar.jpg'}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background',
            user.isOnline ? 'bg-green-500' : 'bg-muted-foreground'
          )}
        />
      </div>

      {/* =============================== user info ================================ */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{user.name}</p>
        <p className="text-xs text-muted-foreground truncate">
          {user.email}
        </p>
      </div>
    </div>
  );
};
