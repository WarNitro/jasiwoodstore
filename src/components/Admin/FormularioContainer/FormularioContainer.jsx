// En src/contenedores/FormularioContainer.jsx
import { useState, useEffect } from 'react';
import { doc, collection, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from '../../../firebase/config';
import { imgBBApiKey } from '../../../imgBB/config';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';


function FormularioContainer() {

    const { id } = useParams();

    const estadoInicialForm = {
        nombre: '',
        categoria: '',
        precio: 0,
        stock: 0,
        imagen: '',
        descripcion: '',
        destacado: false
    };

    const [producto, setProducto] = useState(estadoInicialForm);
    const navigate = useNavigate();
        
    useEffect(() => {
        if (id != null) {
            getDoc(doc(db, "productos", id))
            .then((respuesta) => {
                if (respuesta.exists()) {
                    setProducto({ ...respuesta.data(), id: respuesta.id });
                }
                else {
                    console.log("No se encontró el producto");
                }
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error)
            });
        }
    }, 
        [id]
    );
    /*
    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }

    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }
    */




    const manejarCambio = async (evento) => {
        evento.preventDefault();

        let { name, value } = evento.target;

        // si lo que disparo el evento fue imagenNueva
        if (name == 'imagenNueva') {
            // trato de subir la imagen
            if (value = await subirImagen(evento.target.files[0])) {
                // si salio bien actualizo la imagen
                setProducto({
                    ...producto, 
                    'imagen': value
                });
            }
        }
        else {
            // actualizo sin mas
            setProducto({
                ...producto, 
                [name]: value
            });
        }        
    };

    const subirImagen = async (imagen) => {

        try {
            console.log("Subiendo imagen a Imgbb...");
            
            const formData = new FormData();
            formData.append('image', imagen);

            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBApiKey}`, {method: 'POST', body: formData});
            const datosImgbb = await respuestaImgbb.json();

            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                return datosImgbb.data.url;
            } 
            else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        }
        catch (err) {
            console.error("Error en el proceso de carga de imagen: ", err.message);
            alert("Hubo un error al cargar la imagen. Por favor, intentá de nuevo.");
        }
    };


    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        
        // si ya tengo imagen (nueva o vieja)
        if (producto.imagen) {
            try {
                console.log('Enviando producto a Firebase:', producto);
            
                // si tengo ID es un edit
                if (producto.id) {
                    // update
                    const docRef = doc(db, "productos", producto.id);
                    await updateDoc(docRef, producto);
                    alert("Producto actualizado con éxito.");
                } 
                else {
                    // create
                    const productosCollection = collection(db, "productos");
                    await addDoc(productosCollection, producto)
                    alert("Producto creado con éxito.");
                }
                navigate('/jasiwoodstore/admin');
            }
            catch (error) {
                console.error("Error en el proceso de envío:", error);
                alert("Hubo un error al cargar el producto. Por favor, intentá de nuevo.");
            }
        }
        else {
            alert("Se necesita una imagen para grabar el producto.");
        }
    };

    return (
        <FormularioProducto
            producto={producto}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
        />
    );

};

export default FormularioContainer;