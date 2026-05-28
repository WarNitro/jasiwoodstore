//import styles from "./ProductoDetalle.module.css"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

function ProductoDetalle() {

    const { id } = useParams()

    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1);
        }
    };
    const agregarAlCarrito = () => {
        if (cantidad > 0)
            alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
    }
    
    useEffect(() => {
        fetch('/jasiwoodstore/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontrado = data.find(p => p.id === parseInt(id));

                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id]);

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }

    return (
        <div className="">
            <h2>{ producto.nombre }</h2>
            <img src={ producto.imagen } alt={ producto.nombre } className="img-fluid" />
            <p>Precio: ${ producto.precio }</p>
            <p>Stock: { producto.stock }</p>
            <p>{ producto.descripcion }</p>
            <div>
                <button onClick={decrementar}>-</button>
                <span style={{ margin: '0 10px' }}>{cantidad}</span>
                <button onClick={incrementar}>+</button>
            </div>
            <button onClick={agregarAlCarrito} disabled={cantidad == 0}>Agregar cantidad a carrito</button>
        </div>
    )
}

export default ProductoDetalle
