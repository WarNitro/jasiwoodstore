//import styles from "./Producto.module.css"
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useCarrito } from '../../../context/CarritoContext';

function Producto({ admin, id, nombre, imagen, precio, descripcion, stock, unidad, categoria }) {

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
                <Link to={ `/jasiwoodstore/producto-detalle/${ id }` }>
                    <img src={ imagen } alt={ nombre } className="card-img-top" style={{ height: "200px" }} />
                </Link>
                <div className="card-body">
                    <h3 className="card-title">{ nombre }</h3>
                    <p className="card-subtitle mb-2 text-body-secondary">Unidad: { unidad }</p>
                    <p className="card-subtitle mb-2 text-body-secondary">Precio: ${ precio }</p>
                    <p className="card-subtitle mb-2 text-body-secondary">Stock: { stock }</p>
                    <p className="card-text">{ descripcion }</p>
                    <div>
                        <button onClick={decrementar} className="btn btn-primary">-</button>
                        <span style={{ margin: '0 10px' }}>{cantidad}</span>
                        <button onClick={incrementar} className="btn btn-primary">+</button>
                        <button onClick={ handleAgregarCarrito } disabled={cantidad == 0} className="btn btn-primary ms-1">Agregar</button>
                    </div>
                    <p>({ cantidadActual } actualmente en carrito)</p>
                </div>
            </div>
        )
    }
}

export default Producto
