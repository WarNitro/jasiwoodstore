import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import { db } from '../../../firebase/config.js';

function GestionCupones() {

    const [cupones, setCupones] = useState([]);
    const [error, setError] = useState(null);
    const [cargandoCupones, setCargandoCupones] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        setCargandoCupones(true);

        const cuponesDB = collection(db, "cupones");
        getDocs(cuponesDB)
        .then((respuesta) => {
            return (
                respuesta.docs.map((doc) => (
                    {...doc.data(), id: doc.id }
                ))
            );
        })
        .then((datos) => {
            setCupones(datos);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargandoCupones(false);
        });
    }, 
        []
    );

    const handleCuponDelete = async (id) => {

        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        //const deleteModal = new bootstrap.Modal('#deleteModal', options)

        if (confirmacion) {
            const docRef = doc(db, "cupones", id);
            await deleteDoc(docRef); // sincronica para esperar que se elimine

            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            // Podria recargarla directamente desde Firebase pero no hace falta
            setCupones(cupones.filter(cupon => cupon.id !== id));

            alert("Cupon eliminado.");
        }
    };

    if (cargandoCupones) {
        return <p>Cargando, por favor espere...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="my-3">
            <h3 className="text-center">Lista de Cupones</h3>
            
            <button onClick={ () => navigate('/jasiwoodstore/admin/editar-cupon') } className="btn btn-primary my-1">Nuevo Cupon</button>

        {cupones.map((cupon) => (
            <div className="card shadow-lg p-0 my-1" key={cupon.id}>
                <div className="row g-0">
                    <div className="col-10 p-2">
                        <h4 className="card-title">{cupon.codigo}</h4>
                         <span className="card-text">Activo: { cupon.activo ? 'Si' : 'No' } - Descuento: { cupon.descuento }%</span><br />
                    {(cupon.desde || cupon.hasta) && (
                        <span className="card-text">Validez </span>
                    )}
                    {cupon.desde && (
                            <span className="card-text">desde: { cupon.desde.toDate().toLocaleString() }</span>
                    )}
                    {(cupon.desde && cupon.hasta) && (
                        <span className="card-text"> - </span>
                    )}
                    {cupon.hasta && (
                            <span className="card-text">hasta: { cupon.hasta.toDate().toLocaleString() }</span>
                    )}
                    </div>
                    <div className="col-2 p-2">
                        <button onClick={() => navigate(`/jasiwoodstore/admin/editar-cupon/${ cupon.id }`)} className="btn btn-primary w-100 m-1">Editar</button>
                        <button onClick={() => handleCuponDelete(cupon.id)} className="btn btn-primary w-100 m-1">Eliminar</button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    )
};

export default GestionCupones;