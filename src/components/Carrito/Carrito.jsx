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

    // Si hay productos, los mostramos
    return (
        <>
            <h2 className="text-center">Carrito</h2>
            { 
                carrito.map(producto => (
                    <div className="col-md-12 card shadow-lg my-2" key={ producto.id }>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={ producto.imagen } alt={ producto.nombre } className="img-fluid rounded-start" style={{ height: "200px" }} />
                            </div>
                            <div className="col-md-8">
                                <h4>{ producto.nombre }</h4>
                                <div>
                                    <button onClick={ () => handlerDecrementar(producto) } className="btn btn-primary">-</button>
                                    <span style={{ margin: '0 10px' }}>{ producto.cantidad }</span>
                                    <button onClick={ () => handlerIncrementar(producto) } className="btn btn-primary">+</button>
                                    <button onClick={ () => handlerQuitarItem(producto) } className="btn btn-primary ms-1">Quitar Producto</button>
                                </div>
                                <p>Cantidad: { producto.cantidad } / Stock: { producto.stock }</p>
                                <p>Precio unitario: ${ producto.precio }</p>
                                <p>Subtotal: ${ producto.precio * producto.cantidad }</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            <hr />
            <h3>Total a pagar: ${ precioTotalCarrito() }</h3>
            <div className="text-end">
                <button onClick={ vaciarCarrito } className="btn btn-primary">Vaciar Carrito</button>
                <button onClick={ ()=>alert("Gracias por comprar") } className="btn btn-primary ms-1">Finalizar Compra</button>
            </div>
        </>
    );

};

export default Carrito;