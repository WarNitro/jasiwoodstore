import styles from "./Producto.module.css"
import { Link } from "react-router-dom"

function Producto({ admin, id, nombre, imagen, precio, descripcion, stock }) {

    if (admin) {
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center m-3 p-3 card shadow-lg" style={{ minHeight: "500px" }}>
                <img src={ imagen } alt={ nombre } className="card-img-top" style={{ height: "200px" }} />
                <div className="card-body">
                    <h3 className="card-title">{ nombre }</h3>
                    <p className="card-subtitle mb-2 text-body-secondary">Precio: ${ precio }<br />
                    Stock: { stock }</p>
                    <p className="card-text">{ descripcion }</p>
                    <Link to={ `/jasiwoodstore/admin/producto-tarjeta/${ id }` } className="btn btn-primary">Editar</Link>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 text-center m-3 p-3 card shadow-lg" style={{ minHeight: "500px" }}>
                <img src={ imagen } alt={ nombre } className="card-img-top" style={{ height: "200px" }} />
                <div className="card-body">
                    <h3 className="card-title">{ nombre }</h3>
                    <p className="card-subtitle mb-2 text-body-secondary">Precio: ${ precio }<br />
                    Stock: { stock }</p>
                    <p className="card-text">{ descripcion }</p>
                    <Link to={ `/jasiwoodstore/producto-detalle/${ id }` } className="btn btn-primary">Detalles</Link>
                </div>
            </div>
        )
    }
}

export default Producto
