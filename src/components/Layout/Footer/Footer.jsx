//import styles from './Footer.module.css'
import { useState, useEffect } from 'react';

import MiembroLista from '../../Miembro/MiembroLista/MiembroLista'


function Footer() {

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
        <footer className="m-0 p-3 container">
            <div className="row">
                <div className="col">
                    <MiembroLista equipo={equipo} />
                </div>
                <div className="col text-end">
                    <span>Pagina diseñada por Nicolás Díaz Repice</span><br />
                    <span>© 2026</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
