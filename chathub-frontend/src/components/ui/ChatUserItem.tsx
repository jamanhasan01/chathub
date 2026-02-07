import { cn } from '@/lib/utils';
import type { IUser } from '@/types/user.types';

interface ChatUserItemProps {
  user: IUser;
  isActive?: boolean;
  onClick: (user: IUser) => void;
}

export const ChatUserItem = ({ user, isActive, onClick }: ChatUserItemProps) => {
  return (
    <button
      onClick={() => onClick(user)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-left',
        isActive
          ? 'bg-brand-blue/10 border border-brand-blue/20'
          : 'hover:bg-gray-50 border border-transparent'
      )}
    >
      {/* Avatar with fallback */}
      <div className="relative">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 flex items-center justify-center">
            <span className="font-medium text-gray-700">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
        )}
        
        {/* Online status */}
        <div className={cn(
          'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
          user.isOnline ? 'bg-green-500' : 'bg-gray-300'
        )} />
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-900 text-sm truncate">
            {user.name}
          </p>
          <span className="text-xs text-gray-400">2m</span>
        </div>
        <p className="text-xs text-gray-500 truncate">
          {user.email}
        </p>
      </div>
    </button>
  );
};