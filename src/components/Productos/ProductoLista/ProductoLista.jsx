import styles from "./ProductoLista.module.css"
import Producto from '../Producto/Producto.jsx'

function ProductoLista({ admin, productos }) {

    return (
        <div className="row align-items-start">
            {
                productos.map((producto, key) => (
                    <Producto key={key} admin={admin} {...producto} />
                ))
            }
        </div>
    )
}

export default ProductoLista
