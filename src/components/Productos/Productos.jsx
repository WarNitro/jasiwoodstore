//import styles from "./Productos.module.css"
import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ProductoLista from "./ProductoLista/ProductoLista";


function Productos({ destacados }) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productosDB = collection(db, "productos");
        getDocs(productosDB)
        .then((respuesta) => {
            // Esta respuesta no es un simple array, es un objeto complejo de Firebase
            return respuesta.docs.map((doc) => {
                return {
                    ...doc.data(), 
                    id: doc.id
                }
            });
        })
        .then((datos) => {
            // si se paso el filtro de destacados filtro el array
            if (destacados) {
                setProductos(datos.filter(producto => producto.destacado == true));
            }
            else {
                setProductos(datos);
            }
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
        });
    }, 
        [] // cuando se va a estar ejecutando este useEffect, si esta vacio es solo al cargarse el componente
    );

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <h2 className="text-center mb-3">Productos</h2>

            <div className="container mt-3">
                <ProductoLista productos={ productos } />
            </div>
        </>
    )
}

export default Productos