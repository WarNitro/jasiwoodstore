import Header from "./Header/Header.jsx"
import Nav from "./Nav/Nav.jsx"
import Footer from "./Footer/Footer.jsx"
import { Outlet } from "react-router-dom"

function Layout() {

  return (
    <>
        <Header />
        <Nav />
        <main style={{ backgroundImage: "url(/jasiwoodstore/img/background.jpg)", backgroundSize: 'cover', backgroundPosition: "center", minHeight: '100vh'  }}>
            <div className="container">
              <div className="p-4 row justify-content-center align-items-center">
                <Outlet />
              </div>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default Layout