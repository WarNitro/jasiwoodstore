//import styles from "./ProductoLista.module.css"
import Producto from '../Producto/Producto.jsx'

function ProductoLista({ admin, productos }) {

    return (
        <>
            {
                productos.map((producto, key) => (
                    <Producto key={key} admin={admin} {...producto} />
                ))
            }
        </>
    )
}

export default ProductoLista
