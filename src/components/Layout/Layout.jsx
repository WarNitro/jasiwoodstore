import Header from "./Header/Header.jsx"
import Nav from "./Nav/Nav.jsx"
import Footer from "./Footer/Footer.jsx"
import { Outlet } from "react-router-dom"

function Layout() {

  return (
    <>
        <Header />
        <Nav />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default Layout