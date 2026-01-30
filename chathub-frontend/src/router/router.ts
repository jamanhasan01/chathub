import { createBrowserRouter } from 'react-router'
import AppLayout from '../components/layouts/AppLayout'
import HomePage from '../pages/Home'
import AboutPage from '../pages/About'
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
])
export default router
