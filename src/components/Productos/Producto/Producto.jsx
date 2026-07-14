//import styles from "./Producto.module.css"
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useCarrito } from '../../../context/CarritoContext';

function Producto({ id, nombre, imagen, precio, descripcion, stock, unidad, categoria }) {

    const producto = { id, nombre, imagen, precio, stock, descripcion, unidad, categoria };

    const { agregarItemCarrito, cantidadItemCarrito } = useCarrito();
    const cantidadActual = cantidadItemCarrito(id);
    const [cantidad, setCantidad] = useState(0);

    const incrementar = () => {
        if (cantidad < stock - cantidadActual) {
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
        <div className="col">
            <div className="card text-center shadow-lg h-100">
                <Link to={ `/jasiwoodstore/producto-detalle/${ id }` }>
                    <img src={ imagen } alt={ nombre } className="card-img-top" style={{ height: "200px" }} />
                </Link>
                <div className="card-body p-3">
                    <h3 className="card-title">{ nombre }</h3>
                    <p className="card-text">Unidad: { unidad }</p>
                    <p className="card-text">Precio: ${ precio }</p>
                    <p className="card-text">Stock: { stock }</p>
                    <p className="card-text">{ descripcion }</p>
                    <div>
                        <button onClick={decrementar} className="btn btn-primary">-</button>
                        <span className="mx-2">{cantidad}</span>
                        <button onClick={incrementar} className="btn btn-primary">+</button>
                        <button onClick={ handleAgregarCarrito } disabled={cantidad == 0} className="btn btn-primary ms-1">Agregar</button>
                    </div>
                </div>
                <div class="card-footer">
                    <small>({ cantidadActual } actualmente en carrito)</small>
                </div>
            </div>
        </div>
    )
}

export default Producto
