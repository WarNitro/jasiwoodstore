import Equipo from '../Asistente/Asistente.jsx'

function EquipoLista() {

    const equipo = [
        { nombre: 'Silvia', puesto: 'Product Owner', imagen: ''},
        { nombre: 'Luis', puesto: 'Diseñador UX/UI', imagen: '' },
        { nombre: 'Matias', puesto: 'Frontend Developer', imagen: '' },
        { nombre: 'Sabrina', puesto: 'Backend Developer', imagen: '' }
    ];

    return (
        <>
            <h2>Equipo TalentoLab</h2>
            <ul>
            {
                equipo.map((equipo, key) => (
                    <li><Equipo key={key} {...equipo} /></li>
                ))
            }
            </ul>
        </>
    )
}

export default EquipoLista
