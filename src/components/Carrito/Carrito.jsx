import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';

function Carrito() {
    
    const { carrito, agregarItemCarrito, quitarItemCarrito, removerItemsCarrito, vaciarCarrito, precioTotalCarrito } = useCarrito();


    const handlerIncrementar = (producto) => {
        if (producto.cantidad < producto.stock) {
            agregarItemCarrito(producto, 1);
        }
    };
    const handlerDecrementar = (producto) => {
        if (producto.cantidad > 1) {
            quitarItemCarrito(producto, 1);
        }
    };
    const handlerQuitarItem = (producto) => {
        if (producto.cantidad > 0) {
            removerItemsCarrito(producto.id);
        }
    };

    if (carrito.length === 0) {
        return (
            <>
                <h2 className="text-center">Carrito</h2>
                <h3 className="text-center">El carrito está vacío</h3>
                <p className="text-center">Agrega productos para continuar la compra.</p>
            </>
        );
    }

    const handleComprar = () => {
        alert("Gracias por comprar");
        vaciarCarrito();
    }

    // Si hay productos, los mostramos
    return (
        <>
            <h2 className="text-center">Carrito</h2>
            { 
                carrito.map(producto => (
                    <div className="card shadow-lg p-0 my-1" key={ producto.id }>
                        <div className="row g-0">
                            <div className="col-2">
                                <img src={ producto.imagen } alt={ producto.nombre } className="img-fluid rounded-start w-100" style={{ height: "200px" }} />
                            </div>
                            <div className="col-10 p-2">
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
            <h3>Total a pagar: ${ precioTotalCarrito() }</h3>
            <div className="text-end">
                <button onClick={ vaciarCarrito } className="btn btn-primary">Vaciar Carrito</button>
                <button onClick={ handleComprar } className="btn btn-primary ms-1">Finalizar Compra</button>
            </div>
        </>
    );

};

export default Carrito;