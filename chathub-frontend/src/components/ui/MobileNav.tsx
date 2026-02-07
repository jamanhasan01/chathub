import { MessageSquare, Users, UserCircle, Settings, type LucideIcon } from 'lucide-react'

interface MobileNavProps {
  onUsersClick?: () => void
}

const MobileNav = ({ onUsersClick }: MobileNavProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex h-full items-center justify-around px-3">
        <NavButton icon={MessageSquare} label="Chats" active />
        <NavButton 
          icon={Users} 
          label="Users" 
          onClick={onUsersClick}
        />
        <NavButton icon={UserCircle} label="Profile" />
        <NavButton icon={Settings} label="Settings" />
      </div>
    </div>
  )
}

interface NavButtonProps {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}

const NavButton = ({ icon: Icon, label, active = false, onClick }: NavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center p-2 transition-colors ${
        active 
          ? 'text-brand-blue' 
          : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

export default MobileNav