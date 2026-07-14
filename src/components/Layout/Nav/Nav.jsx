//import styles from './Nav.module.css'
import { Link } from "react-router-dom"
import { useCarrito } from '../../../context/CarritoContext';
import { useAuth } from '../../../context/AuthContext';

function Nav() {

    const { cantidadTotalCarrito } = useCarrito();
    const totalItems = cantidadTotalCarrito();

    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary m-0">
            <div className="container-fluid">
                <Link to="/jasiwoodstore/" className="navbar-brand d-block d-md-none">Jasiwood Store</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-lg-0 justify-content-center">
                        <li className="nav-item m-2">
                            { /*<a class="nav-link active" aria-current="page" href="#">Home</a>*/ }
                            <Link to="/jasiwoodstore/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/productos" className="nav-link">Productos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/contacto" className="nav-link">Quienes Somos</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/carrito" className="nav-link">Carrito{ totalItems > 0 && <span> ({totalItems})</span> }</Link>
                        </li>

                    {user && (user.rol === 'admin' || user.rol === 'dataentry') ? (
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/admin" className="nav-link">Admin</Link>
                        </li>
                    )
                    : 
                    !user && (
                        <>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/login" className="nav-link">Entrar</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/jasiwoodstore/registro" className="nav-link">Registrarse</Link>
                        </li>
                        </>
                    )}
                    </ul>
                {user && (
                    <div className="navbar-text m-2">
                        <span>{user.email} <a href="" onClick={ logout }>(Logout)</a></span>
                    </div>
                )}
                </div>
            </div>
        </nav>
    )
}

export default Nav
