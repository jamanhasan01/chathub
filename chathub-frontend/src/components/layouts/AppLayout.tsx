import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Aside } from './Aside'
import { Header } from './Header'
import MobileNav from '../ui/MobileNav'
import { X } from 'lucide-react'
import { getMe, type ApiResponse } from '@/api/auth.api'
import type { IUser } from '@/types/user.types'
import { useQuery } from '@tanstack/react-query'

const AppLayout = () => {
  const [mobileAsideOpen, setMobileAsideOpen] = useState(false)
  const navigate = useNavigate()

  const {
    data: myUserId,
    isLoading,
    isError,
  } = useQuery<ApiResponse<IUser>, Error, string>({
    queryKey: ['me'],
    queryFn: getMe,
    select: (res) => {
      if (!res.data) throw new Error('User not found')
      return res.data._id
    },
    retry: false,
  })

  useEffect(() => {
    if (!isLoading && (isError || !myUserId)) {
      navigate('/login', { replace: true })
    }
  }, [isLoading, isError, myUserId, navigate])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-gray-300 border-t-brand-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-600">Checking authentication…</p>
        </div>
      </div>
    )
  }

  if (!myUserId) return null

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-gray-900">
      {/* Mobile Aside Overlay */}
      {mobileAsideOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileAsideOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Aside />
      </div>

      {/* Sidebar - Mobile */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72
          transform transition-transform duration-300
          ${mobileAsideOpen ? 'translate-x-0' : '-translate-x-full'}
          border-r border-gray-200 bg-white shadow-xl
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white">
          <span className="font-semibold text-gray-900">All Contacts</span>
          <button
            onClick={() => setMobileAsideOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <Aside />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        <Header />

        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0 bg-gray-50">
          <Outlet />
        </main>

        <MobileNav onUsersClick={() => setMobileAsideOpen(true)} />
      </div>
    </div>
  )
}

export default AppLayout