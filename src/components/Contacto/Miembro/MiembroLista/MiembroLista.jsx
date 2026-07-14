import Miembro from '../Miembro/Miembro.jsx'

function MiembroLista({ equipo }) {

    return (
        <div className="row row-cols-8 g-3 justify-content-center">
        {
            equipo.map((miembro, key) => (
                <Miembro key={key} {...miembro} />
            ))
        }
        </div>
    )
}

export default MiembroLista
