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
            <div><button onClick={ () => navigate('/jasiwoodstore/admin/editar-producto') } className="btn btn-primary">Nuevo Producto</button></div>

        {productos.map((producto) => (
            <div className="card shadow-lg my-1" key={producto.id}>
                <div className="row g-0">
                    <div className="col-md-2">
                        <img src={ producto.imagen=='' ? '/jasiwoodstore/img/sample.png' : producto.imagen } alt={ producto.nombre } className="img-fluid rounded-start" style={{ height: "100px" }} />
                    </div>
                    <div className="col-md-10">
                        <h4>{producto.nombre}</h4>
                        <p>${producto.precio}</p>
                        <div>
                            <button onClick={() => navigate(`/jasiwoodstore/admin/editar-producto/${ producto.id }`)} className="btn btn-primary">Editar</button>
                            <button onClick={() => handleDelete(producto.id)} className="btn btn-primary ms-1">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </>
    );
};

export default Admin;