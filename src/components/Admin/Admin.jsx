import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import { db } from '../../firebase/config.js';


export function Admin() {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const navigate = useNavigate();

    const estadoInicialForm = {
        nombre: '',
        categoria: '',
        precio: 0,
        stock: 0,
        imagen: '',
        descripcion: '',
        destacado: false
    };

    useEffect(() => {
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
            setCargando(false);
        });
    }, 
        [productos]
    );

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef); // sincronica para esperar que se elimine

            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));

            alert("Producto eliminado.");
        }
    };


    return (
        <>
            <h2 className="text-center">Administración del Sitio</h2>
            
            <h3 className="text-center">Lista de Productos</h3>
            <div className="row my-1 p-0">
                <button onClick={ () => navigate('/jasiwoodstore/admin/editar-producto') } className="btn btn-primary">Nuevo Producto</button>
            </div>

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
                        <button onClick={() => handleDelete(producto.id)} className="btn btn-primary w-100 m-1">Eliminar</button>
                    </div>
                </div>
            </div>
        ))}
        </>
    );
};

export default Admin;