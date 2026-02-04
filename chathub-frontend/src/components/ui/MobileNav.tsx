import { MessageSquare, Users, UserCircle, Settings, type LucideIcon } from 'lucide-react'

/* =============================== component ================================ */

const MobileNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-gray-900/90 backdrop-blur-xl border-t border-gray-800">
      <div className="flex items-center justify-around p-3">
        <NavButton icon={MessageSquare} label="Chats" active />
        <NavButton icon={Users} label="Groups" />
        <NavButton icon={UserCircle} label="Contacts" />
        <NavButton icon={Settings} label="Settings" />
      </div>
    </div>
  )
}

/* =============================== types ================================ */

interface NavButtonProps {
  icon: LucideIcon
  label: string
  active?: boolean
}

/* =============================== sub-component ================================ */

const NavButton = ({ icon: Icon, label, active = false }: NavButtonProps) => {
  return (
    <button
      type="button"
      className={`flex flex-col items-center p-2 transition-colors ${
        active ? 'text-blue-400' : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  )
}

export default MobileNav
