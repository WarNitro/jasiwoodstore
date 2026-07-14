import styles from "./ProductoLista.module.css"
import Producto from '../Producto/Producto'

function ProductoLista({ productos }) {

    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3 justify-content-center">
            {
                productos.map((producto, key) => (
                    <Producto key={key} {...producto} />
                ))
            }
        </div>
    )
}

export default ProductoLista
