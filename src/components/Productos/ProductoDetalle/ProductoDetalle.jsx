//import styles from "./ProductoDetalle.module.css"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../../firebase/config.js';
import { useCarrito } from '../../../context/CarritoContext';

function ProductoDetalle() {

    const { id } = useParams();

    const { agregarItemCarrito, cantidadItemCarrito } = useCarrito();
    const cantidadActual = cantidadItemCarrito(id);

    const [cantidad, setCantidad] = useState(0);
    const [producto, setProducto] = useState(null);
    
    useEffect(() => {
        getDoc(doc(db, "productos", id))
        .then((respuesta) => {
            if (respuesta.exists()) {
                setProducto({ ...respuesta.data(), id: respuesta.id });
            }
            else {
                console.log("No se encontró el producto");
            }
        })
        .catch((error) => {
            console.error("Error al cargar el producto:", error)
        });
    }, 
        [id]
    );

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }

    const incrementar = () => {
        if (cantidad < producto.stock - cantidadActual) {
            setCantidad(cantidad + 1);
        }
    };
    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };
    const handleAgregarCarrito = () => {
        if (cantidad > 0) {
            agregarItemCarrito(producto, cantidad);
            setCantidad(0);
            alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`);
        }
    };

    return (
        <div className="card shadow-lg p-4">
            <h2>{ producto.nombre }</h2>
            <img src={ producto.imagen=='' ? '/jasiwoodstore/img/sample.jpg' : producto.imagen } alt={ producto.nombre } className="card-img-top" />
            <p>Unidad: { producto.unidad }</p>
            <p>Precio: ${ producto.precio }</p>
            <p>Stock: { producto.stock }</p>
            <div>
                <button onClick={ decrementar } className="btn btn-primary">-</button>
                <span style={{ margin: '0 10px' }}>{cantidad}</span>
                <button onClick={ incrementar } className="btn btn-primary">+</button>
                <button onClick={ handleAgregarCarrito } disabled={cantidad == 0} className="btn btn-primary ms-1">Agregar al Carrito</button>
            </div>
            <p>({ cantidadActual } actualmente en carrito)</p>
            <h3>Descripcion:</h3>
            <p>{ producto.descripcion }</p>
        </div>
    )
}

export default ProductoDetalle
