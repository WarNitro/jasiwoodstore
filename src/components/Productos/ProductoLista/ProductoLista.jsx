import styles from "./ProductoLista.module.css"
import Producto from '../Producto/Producto'

function ProductoLista({ productos }) {

    return (
        <div className="row justify-content-center align-items-center">
            {
                productos.map((producto, key) => (
                    <Producto key={key} {...producto} />
                ))
            }
        </div>
    )
}

export default ProductoLista
