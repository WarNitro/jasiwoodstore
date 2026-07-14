import { useState, useEffect } from 'react';
import { db } from '../../../firebase/config.js';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FormularioContainer } from '../FormularioContainer/FormularioContainer';


export function Gestion() {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

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
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormularioContainer estadoInicialForm={estadoInicialForm} />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
            {productos.map((prod) => (
                <li key={prod.id}>
                    {prod.nombre} - ${prod.precio}
                    <button style={{ marginLeft: '10px' }}>Editar</button>
                    <button onClick={() => handleDelete(prod.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Gestion;