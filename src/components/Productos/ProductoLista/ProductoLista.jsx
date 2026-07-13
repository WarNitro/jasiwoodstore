import styles from "./ProductoLista.module.css"
import Producto from '../Producto/Producto'

function ProductoLista({ admin, productos }) {

    return (
        <div className="row justify-content-center align-items-center">
            {
                productos.map((producto, key) => (
                    <Producto key={key} admin={admin} {...producto} />
                ))
            }
        </div>
    )
}

export default ProductoLista
