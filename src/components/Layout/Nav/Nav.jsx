import styles from './Nav.module.css'
import { Link } from "react-router-dom"

function Nav() {

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                { /*<Link to="/jasiwoodstore/" className="navbar-brand">Pasteles Jasiwood</Link>*/ }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
                        <li className="nav-item m-2">
                            { /*<a class="nav-link active" aria-current="page" href="#">Home</a>*/ }
                            <Link to="/jasiwoodstore/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/productos" className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/contacto" className="nav-link disabled" aria-disabled="true">Contacto</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/admin" className="nav-link">Admin</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/carrito" className="nav-link disabled" aria-disabled="true">Carrito</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav
