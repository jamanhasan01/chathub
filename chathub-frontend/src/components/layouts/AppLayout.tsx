import { Outlet } from 'react-router'
import Header from '../ui/Header'

const AppLayout = () => {
  return (
    <div>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default AppLayout
