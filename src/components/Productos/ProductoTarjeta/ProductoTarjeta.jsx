//import styles from "./ProductoTarjeta.module.css"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react"

function ProductoTarjeta() {

    const { id } = useParams()

    //const [producto, setProducto] = useState(null);
    const [datosForm, setDatosForm] = useState(
        {
            nombre: '',
            precio: '',
            stock: '',
            imagen: '',
            descripcion: ''
        }
    );
    const [imagenFile, setImagenFile] = useState(null);


    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        })
    }
    const setImagen = async (imagen) => {

        if (!imagen) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        const apiKey = '758b49a4f1cd81511ac47ebeb58b0189'; 

        const formData = new FormData();
        formData.append('image', imagen);
        try {
            console.log("Subiendo imagen a Imgbb...");

            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {method: 'POST', body: formData });
            const datosImgbb = await respuestaImgbb.json();
        
            if (datosImgbb.success) {
                console.log("Imagen subida con éxito. URL:", datosImgbb.data.url);

                setDatosForm({
                    ...datosForm,
                    imagen: datosImgbb.data.url
                })
            } 
            else {
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } 
        catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        }
    }
    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (parseInt(id))
            console.log('Producto Actualizado!');
        else
            console.log('Producto Creado!');

        console.log('Enviado los siguientes datos a la API de mentira:', datosForm);
    }
    
    if (parseInt(id)) {

        useEffect(() => {
            fetch('/data/productos.json')
                .then(response => response.json())
                .then(data => {
                    const productoEncontrado = data.find(p => p.id === parseInt(id));

                    setDatosForm(productoEncontrado);
                })
                .catch(error => console.error("Error al cargar el producto:", error));
        }, [id]);

        if (!datosForm) {
            return <h2>Cargando detalle del producto...</h2>;
        }

        if (!datosForm.id) {
            return <h2>Producto no encontrado.</h2>;
        }
    }

    return (
        <form onSubmit={ formSubmitHandler }>
            <p>Nombre: <input type="text" name="nombre" placeholder="Nombre del producto" value={ datosForm.nombre } onChange={ manejarCambio } /></p>
            <img src={ datosForm.imagen } alt={ datosForm.nombre } width="200" height="200" />
            <input type="file" name="imagen" accept="image/png, image/jpeg" onChange={ (e) => setImagen(e.target.files[0]) } />
            <p>Precio: <input type="number" name="precio" placeholder="99999,99" value={ datosForm.precio } onChange={ manejarCambio }  /></p>
            <p>Stock:  <input type="number" name="stock" placeholder="45" value={ datosForm.stock } onChange={ manejarCambio }  /></p>
            <p><textarea name="descripcion" value={ datosForm.descripcion } onChange={ manejarCambio } /></p>
            <button type="submit">Grabar Cambios</button>
        </form>
    )
}

export default ProductoTarjeta
