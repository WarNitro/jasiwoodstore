
function Miembro({ nombre, puesto, imagen }) {
    return (
        <div className="card text-center m-2" style={{ width: "130px" }}>
            <img src={imagen} alt={nombre} className="card-img-top" width="100" height="100" />
            <p className="card-text">{nombre}<br />{puesto}</p>
        </div>
    )
}

export default Miembro