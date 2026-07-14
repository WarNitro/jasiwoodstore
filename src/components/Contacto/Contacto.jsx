import { useState, useEffect } from 'react';

import MiembroLista from './Miembro/MiembroLista/MiembroLista'


function Contacto() {

    const [equipo, setEquipo] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/jasiwoodstore/data/equipo.json')
        .then((respuesta) => {
        if (!respuesta.ok) {
            throw new Error('No se pudo cargar la información de los productos');
        }
        return respuesta.json();
        })
        .then((datos) => {
        setEquipo(datos);
        })
        .catch((error) => {
        throw new Error('No se pudo cargar la información del equipo', error.message);
        })
        .finally(() => {
        setCargando(false);
        });
    }, 
        []
    );


    return (
        <>
            <h2 className="text-center mb-3">Quienes Somos</h2>

            <div className="col">
                <MiembroLista equipo={equipo} />
            </div>

            
        </>
    )
}

export default Contacto