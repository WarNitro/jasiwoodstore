import styles from "./Producto.module.css"
import { Link } from "react-router-dom"

function Producto({ admin, id, nombre, imagen, precio, stock }) {

    if (admin) {
        return (
            <div className={styles.producto}>
                <h3>{ nombre }</h3>
                <img src={ imagen } alt={ nombre } width="100" height="100" />
                <p>Precio: ${ precio }</p>
                <Link to={ `/admin/producto-tarjeta/${ id }` }>Editar</Link>
            </div>
        )
    }
    else {
        return (
            <div className={styles.producto}>
                <h3>{ nombre }</h3>
                <img src={ imagen } alt={ nombre } width="100" height="100" />
                <p>Precio: ${ precio }</p>
                <p>Stock: { stock }</p>
                <Link to={ `/producto-detalle/${ id }` }>Detalles</Link>
            </div>
        )
    }
}

export default Producto
