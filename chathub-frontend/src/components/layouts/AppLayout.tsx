import { Outlet } from "react-router"

const AppLayout = () => {
  return (
    <div>
        <header>header</header>
        <main>
            <Outlet></Outlet>
        </main>
        <footer>footer</footer>
    </div>
  )
}

export default AppLayout