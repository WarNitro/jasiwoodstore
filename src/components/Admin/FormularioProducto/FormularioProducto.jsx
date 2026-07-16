import { useState, useEffect } from 'react';
import { doc, collection, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from '../../../firebase/config';
import { imgBBApiKey } from '../../../imgBB/config';


function FormularioProducto() {

    const { id } = useParams();

    const estadoInicialForm = {
        nombre: '',
        categoria: '',
        precio: 0,
        stock: 0,
        imagen: '',
        descripcion: '',
        destacado: false,
        unidad: ''
    };

    const [producto, setProducto] = useState(estadoInicialForm);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
        
    useEffect(() => {
        if (id != null) {
            getDoc(doc(db, "productos", id))
            .then((respuesta) => {
                if (respuesta.exists()) {
                    setProducto({ ...respuesta.data(), id: respuesta.id });
                }
                else {
                    setError("No se encontró el producto");
                }
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
                setError("Error al cargar el producto, intente nuevamente");
            });
        }
    }, 
        [id]
    );

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

        if (!producto.nombre || !producto.precio || !producto.stock || !producto.unidad) {
            alert("Faltan campos obligatorios.");
            return;
        }

        if (!producto.imagen) {
            alert("Se necesita una imagen para grabar el producto.");
            return;
        }
        
        // si ya tengo campos obligatorios y alguna imagen (nueva o vieja)
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
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    // podria crear un componente nuevo solo presentacional
    return (
        <>
            {producto.id ? (<h2 className="text-center">Editar Producto</h2>) : (<h2 className="text-center">Agregar Nuevo Producto</h2>)}

            <div className="row justify-content-center mt-3">
                <form className="form col-md-6 bg-white border p-3" onSubmit={ manejarEnvio }>
                    <div className="mb-3">
                        <label for="producto-nombre" className="form-label">Nombre del Producto:</label>
                        <input id="producto-nombre" type="text" name="nombre" value={producto.nombre} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="producto-unidad" className="form-label">Unidad:</label>
                        <input id="producto-unidad" type="text" placeholder="Ej: docena, kg" name="unidad" value={producto.unidad} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="producto-precio" className="form-label">Precio:</label>
                        <input id="producto-precio" type="number" min="0" name="precio" value={producto.precio} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="producto-stock" className="form-label">Stock:</label>
                        <input id="producto-stock" type="number" min="0" name="stock" value={producto.stock} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="producto-imagen" className="form-label">Imagen:</label>
                    {producto.imagen != '' && (
                        <img src={ producto.imagen } alt={ producto.nombre } width="100" height="100" />
                    )}
                        <input id="producto-imagen" type="file" placeholder="https://…" name="imagenNueva" onChange={manejarCambio} className="form-control" />
                    </div>
                    <div className="mb-3 form-check">
                        <label for="producto-destacado" className="form-check-label">Producto Destacado</label>
                        <input id="producto-destacado" type="checkbox" name="destacado" defaultChecked={ producto.destacado } onChange={manejarCambio} className="form-check-input" />
                    </div>
                    <div className="mb-3">
                        <label for="producto-descripcion" className="form-label">Descripcion:</label>
                        <textarea id="producto-descripcion" name="descripcion" value={producto.descripcion} onChange={manejarCambio} className="form-control" rows="3"></textarea>
                    </div>
                    {producto.id && (<input type="hidden" name="id" value={producto.id} />)}
                    {producto.imagen && (<input type="hidden" name="id" value={producto.imagen} />)}
                    <button type="submit" className="btn btn-primary">Guardar Producto</button>
                </form>
            </div>
        </>
    );
}

export default FormularioProducto;
