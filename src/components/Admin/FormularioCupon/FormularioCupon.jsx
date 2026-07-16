import { useState, useEffect } from 'react';
import { doc, collection, getDoc, addDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from '../../../firebase/config';


function FormularioCupon() {

    const { id } = useParams();

    const estadoInicialForm = {
        codigo: '',
        descuento: 0
    };

    const [cupon, setCupon] = useState(estadoInicialForm);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
        
    useEffect(() => {
        if (id != null) {
            getDoc(doc(db, "cupones", id))
            .then((respuesta) => {
                if (respuesta.exists()) {
                    setCupon({ ...respuesta.data(), id: respuesta.id });
                }
                else {
                    setError("No se encontró el cupon");
                }
            })
            .catch((error) => {
                console.error("Error al cargar el cupon:", error);
                setError("Error al cargar el cupon, intente nuevamente");
            });
        }
    }, 
        [id]
    );

    const manejarCambio = async (evento) => {
        evento.preventDefault();

        const { name, value } = evento.target;
        setCupon({
            ...cupon, 
            [name]: value
        });     
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        if (!cupon.codigo || !cupon.descuento) {
            alert("Faltan campos obligatorios");
            return;
        }
        
        // si ya tengo campos obligatorios
        try {
            console.log('Enviando cupon a Firebase:', cupon);
        
            // si tengo ID es un edit
            if (cupon.id) {
                // update
                const docRef = doc(db, "cupones", cupon.id);
                await updateDoc(docRef, {
                    ...cupon,
                    descuento: Number(cupon.descuento),
                    desde: Timestamp.fromDate(new Date(cupon.desde)),
                    hasta: Timestamp.fromDate(new Date(cupon.hasta))
            });
                alert("Cupon actualizado con éxito.");
            } 
            else {
                // create
                const cuponesCollection = collection(db, "cupones");
                await addDoc(cuponesCollection, {
                    ...cupon,
                    descuento: Number(cupon.descuento),
                    desde: cupon.desde ? Timestamp.fromDate(new Date(cupon.desde)) : null,
                    hasta: cupon.hasta ? Timestamp.fromDate(new Date(cupon.hasta)) : null
            });
                alert("Cupon creado con éxito.");
            }
            navigate('/jasiwoodstore/admin');
        }
        catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert("Hubo un error al cargar el cupon. Por favor, intentá de nuevo.");
        }
    };

    if (error) {
        return <p>Error: {error}</p>;
    }

    // podria crear un componente nuevo solo presentacional
    return (
        <>
            {cupon.id ? (<h2 className="text-center">Editar Cupon</h2>) : (<h2 className="text-center">Agregar Nuevo Cupon</h2>)}

            <div className="row justify-content-center mt-3">
                <form className="form col-md-6 bg-white border p-3" onSubmit={ manejarEnvio }>
                    <div className="mb-3">
                        <label for="cupon-codigo" className="form-label">Código del Cupon*:</label>
                        <input id="cupon-codigo" type="text" name="codigo" value={cupon.codigo} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="cupon-descuento" className="form-label">% Descuento*:</label>
                        <input id="cupon-descuento" type="number" min="0" max="100" placeholder="50" name="descuento" value={cupon.descuento} onChange={manejarCambio} required className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="cupon-desde" className="form-label">Validez desde:</label>
                        <input id="cupon-desde" type="datetime-local" name="desde" value={cupon.desde} onChange={manejarCambio} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label for="cupon-hasta" className="form-label">Validez hasta:</label>
                        <input id="cupon-hasta" type="datetime-local" name="hasta" value={cupon.hasta} onChange={manejarCambio} className="form-control" />
                    </div>
                    {cupon.id && (<input type="hidden" name="id" value={cupon.id} />)}
                    <button type="submit" className="btn btn-primary">Guardar Cupon</button>
                </form>
            </div>
        </>
    );

};

export default FormularioCupon;