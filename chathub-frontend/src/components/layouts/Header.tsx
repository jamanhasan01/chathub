import { Bell, Search, User } from 'lucide-react'
import { Button } from '../ui/button'

export const Header = () => {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md px-6 flex items-center justify-between">
      {/* Left Side: Context / Breadcrumbs */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-foreground/80">General Channel</h2>
        <span className="text-muted-foreground">/</span>
        <span className="text-xs text-muted-foreground">Messages</span>
      </div>

      {/* Right Side: Actions */}
      <div className="flex items-center gap-3">
        {/* Global Search for Mobile/Small desktop */}
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-purple rounded-full border-2 border-background" />
        </Button>

        {/* User Profile Trigger */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-xs font-medium text-foreground">John Doe</span>
            <span className="text-[10px] text-green-500">Online</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple p-[1px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <User className="w-4 h-4 text-foreground" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
