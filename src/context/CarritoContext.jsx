import React, { useState, useContext, createContext } from 'react';


// crea el contexto y todo lo que este dentro de este componente tiene acceso directo
export const CarritoContext = createContext();

// funcion para usar el contexto desde cualquier componente dentro del Provider, inicializa
export const useCarrito = () => {
    const context = useContext(CarritoContext);

    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CarritoProvider');
    }
    return context;
};

// cerebro, nos provee las funciones para manejar el contexto del carrito
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [cupon, setCupon] = useState(null);

    /*
        Aca van las funciones del carrito que vamos a exportar para que los componentes usen:
    */
    const agregarItemCarrito = (producto, cantidad) => {

        const itemInCart = carrito.find(item => item.id === producto.id);

        if (itemInCart) {
            const updatedCart = carrito.map(item => 
                item.id === producto.id ? 
                    { ...item, cantidad: item.cantidad + cantidad } : 
                    item
            );
            setCarrito(updatedCart);
        } 
        else {
            setCarrito(prevCart => [...prevCart, { ...producto, cantidad }]);
        }
    };

    const cantidadItemCarrito = (productId) => {
        const item = carrito.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    };

    const quitarItemCarrito = (producto, cantidad) => {
        const itemInCart = carrito.find(item => item.id === producto.id);
        if (itemInCart) {
            if (itemInCart.cantidad > 1) {
                const updatedCart = carrito.map(item => 
                    item.id === producto.id ? 
                        { ...item, cantidad: item.cantidad - cantidad } : 
                        item
                );
                setCarrito(updatedCart);
            }
            else {
                removerItemCarrito(itemInCart.id);
            }
            
        }
    };

    const removerItemsCarrito = (productId) => {
        const updatedCart = carrito.filter(item => item.id !== productId);
        setCarrito(updatedCart);
    };

    const itemEnCarrito = (productId) => {
        return carrito.some(item => item.id === productId);
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const cantidadTotalCarrito = () => {
        return carrito.reduce((acc, item) => acc + item.cantidad, 0);
    };

    const precioTotalCarrito = () => {
        return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };

    const guardarCupon = (cupon) => {
        setCupon(cupon);
    }

    const recuperarCupon = () => {
        return cupon;
    }

    const quitarCupon = () => {
        setCupon(null);
    }

    const exports = {
        carrito, 
        agregarItemCarrito, 
        quitarItemCarrito, 
        removerItemsCarrito, 
        itemEnCarrito, 
        vaciarCarrito, 
        cantidadTotalCarrito, 
        cantidadItemCarrito, 
        precioTotalCarrito,
        guardarCupon,
        recuperarCupon,
        quitarCupon
    };

    return (
        <CarritoContext.Provider value={ exports }>
            {children}
        </CarritoContext.Provider>
    );
};

