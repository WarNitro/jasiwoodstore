import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { query, collection, where, getDocs, Timestamp} from 'firebase/firestore';

import { db } from '../../firebase/config';
import { useCarrito } from '../../context/CarritoContext';


function Carrito() {
    
    // hay alguna mejor manera de anotar esto?
    const { 
        carrito, 
        agregarItemCarrito, 
        quitarItemCarrito, 
        removerItemsCarrito, 
        vaciarCarrito, 
        precioTotalCarrito, 
        cantidadTotalCarrito,
        guardarCupon, 
        recuperarCupon, 
        quitarCupon 
    } = useCarrito();

    const [cupon, setCupon] = useState(recuperarCupon());

    const handlerIncrementar = (producto) => {
        if (producto.cantidad < producto.stock) {
            agregarItemCarrito(producto, 1);
        }
    };
    const handlerDecrementar = (producto) => {
        if (producto.cantidad > 1) {
            quitarItemCarrito(producto, 1);

            // si saque el ultimo item del carrito tambien saco el cupon
            // no lo puedo hacer funcionar, seran asincronicas?
            // if (carrito.length === 0) {
            if (cantidadTotalCarrito() === 0) {
                quitarCupon();
                setCupon(null);
            }
        }
    };
    const handlerQuitarItem = (producto) => {
        if (producto.cantidad > 0) {
            removerItemsCarrito(producto.id);
        }
    };

    const handleComprar = () => {
        alert("Gracias por comprar");
        vaciarCarrito();
    }

    const aplicarCupon = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); 
        const data = Object.fromEntries(formData.entries()); 
        const codigoCupon = data.cupon;
        
        if(!codigoCupon) {
            alert("Ingrese Cupón.");
            return;
        }

        const queryCupon = query(
            collection(db, "cupones"),
            where("codigo", "==", codigoCupon.toUpperCase()),
            where("activo", "==", true),
            where("desde", "<=", Timestamp.fromDate(new Date())),
            where("hasta", ">=", Timestamp.fromDate(new Date()))
        );

        getDocs(queryCupon)
        .then((respuesta) => {
            if (respuesta.empty) {
                alert("Cupón inválido");
                return;
            }
            setCupon(respuesta.docs[0].data());
            guardarCupon(respuesta.docs[0].data());
            alert("Cupón aplicado");
        })
        .catch((err) => {
            console.error("Error al cargar el cupon: ", err.message);
        })
    }

    const handleQuitarCupon = () => {
        quitarCupon();
        setCupon(null);
        alert("Se quito el cupón.");
    }

    const handleVaciarCarrito = () => {
        const quiereVaciar = window.confirm('¿Está seguro que quiere vaciar el carrito?. Esta accion es irreversible.');

        if (quiereVaciar) {
            vaciarCarrito();
            quitarCupon();
            setCupon(null);
        }
    }

    // si no hay productos muestro otro mensaje
    if (carrito.length === 0) {
        return (
            <>
                <h2 className="text-center">Carrito</h2>
                <h3 className="text-center">El carrito está vacío</h3>
                <p className="text-center">Agrega productos para continuar la compra.</p>
            </>
        );
    }

    // Si hay productos, los mostramos
    return (
        <>
            <h2 className="text-center">Carrito</h2>

            { 
                carrito.map(producto => (
                    <div className="card shadow-lg p-0 my-1" key={ producto.id }>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={ producto.imagen } alt={ producto.nombre } className="img-fluid rounded-start w-100" style={{ height: "200px" }} />
                            </div>
                            <div className="col-md-8 p-2">
                                <h4 className="card-title">{ producto.nombre }</h4>
                                <div>
                                    <button onClick={ () => handlerDecrementar(producto) } className="btn btn-primary">-</button>
                                    <span className="mx-2">{ producto.cantidad }</span>
                                    <button onClick={ () => handlerIncrementar(producto) } className="btn btn-primary">+</button>
                                    <button onClick={ () => handlerQuitarItem(producto) } className="btn btn-primary ms-1">Quitar Producto</button>
                                </div>
                                <p className="card-text">Cantidad: { producto.cantidad } / Stock: { producto.stock }</p>
                                <p className="card-text">Precio unitario: ${ producto.precio }</p>
                                <p className="card-text">Subtotal: ${ producto.precio * producto.cantidad }</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            <hr />
            <div className="col-lg-6">
            {cupon && cupon.descuento != 0 ? (
            <>
                <span>Subtotal a pagar: ${ precioTotalCarrito() }</span><br />
                <span>Descuento cupón "{cupon.codigo}"": ${ precioTotalCarrito() * (cupon.descuento / 100) }</span> <button type="submit" className="btn btn-sm btn-danger ml-1" onClick={() => handleQuitarCupon() }>Quitar</button>
                <hr />
                <h3>Total a pagar: ${ precioTotalCarrito() * (1 - cupon.descuento / 100) }</h3>
            </>
            )
            :
            (
                <h3>Total a pagar: ${ precioTotalCarrito() }</h3>
            )}
            </div>
            <div className="col-lg-6">
                <form className="row mx-0 px-0" onSubmit={ (e) => aplicarCupon(e) }>
                    <div className="col-auto"><label for="cupon" className="col-form-label">Agregar cupón:</label></div>
                    <div className="col-auto"><input id="cupon" type="text" name="cupon" required className="form-control" /></div>
                    <div className="col-auto"><button type="submit" className="btn btn-primary">Aplicar Cupón</button></div>
                </form>
            </div>
            
            <div className="text-end">
                <button onClick={ handleVaciarCarrito } className="btn btn-primary">Vaciar Carrito</button>
                <button onClick={ handleComprar } className="btn btn-primary ms-1">Finalizar Compra</button>
            </div>
        </>
    );

};

export default Carrito;