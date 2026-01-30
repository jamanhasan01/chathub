import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/layouts/AppLayout'
import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
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
    ],
  },
  {
    path:"/login",
    Component:Login
  },
  {
    path:"/register",
    Component:Register
  },
])
export default router
