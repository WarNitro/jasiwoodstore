import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import { db } from '../../../firebase/config.js';

function GestionProductos() {
    
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargandoProductos, setCargandoProductos] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setCargandoProductos(true);

        const productosDB = collection(db, "productos");
        getDocs(productosDB)
        .then((respuesta) => {
            return (
                respuesta.docs.map((doc) => (
                    {...doc.data(), id: doc.id }
                ))
            );
        })
        .then((datos) => {
            setProductos(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargandoProductos(false);
        });
    }, 
        []
    );

    const handleProductoDelete = async (id) => {
    
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        //const deleteModal = new bootstrap.Modal('#deleteModal', options)

        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef); // sincronica para esperar que se elimine

            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            // Podria recargarla directamente desde Firebase pero no hace falta
            setProductos(productos.filter(prod => prod.id !== id));

            alert("Producto eliminado.");
        }
    };

    if (cargandoProductos) {
        return <p>Cargando, por favor espere...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (

        <div className="my-3">
            <h3 className="text-center">Lista de Productos</h3>
            
            <button onClick={ () => navigate('/jasiwoodstore/admin/editar-producto') } className="btn btn-primary my-1">Nuevo Producto</button>
            
        {productos.map((producto) => (
            <div className="card shadow-lg p-0 my-1" key={producto.id}>
                <div className="row g-0">
                    <div className="col-2">
                        <img src={ producto.imagen=='' ? '/jasiwoodstore/img/sample.png' : producto.imagen } alt={ producto.nombre } className="img-fluid rounded-start w-100" style={{height: "120px"}} />
                    </div>
                    <div className="col-8 p-2">
                        <h4 className="card-title">{producto.nombre}</h4>
                        <span className="card-text">Precio: ${producto.precio} - Unidad: {producto.unidad} - Stock: {producto.stock} - Destacado: {producto.destacado}</span>
                    </div>
                    <div className="col-2 p-2">
                        <button onClick={() => navigate(`/jasiwoodstore/admin/editar-producto/${ producto.id }`)} className="btn btn-primary w-100 m-1">Editar</button>
                        <button onClick={() => handleProductoDelete(producto.id)} className="btn btn-primary w-100 m-1">Eliminar</button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    )
}

export default GestionProductos;