import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/layouts/AppLayout'
import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ChatRoom from '@/pages/ChatRoom'
const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'about',
        Component: AboutPage,
      },
      {
        path: 'chat/room/:roomId',
        Component: ChatRoom,
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
])
export default router
