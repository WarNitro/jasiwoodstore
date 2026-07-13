import Productos from "../Productos/Productos"

function Home() {

    return (
        <>
            <h2 className="text-center">Bienvenidos a la tienda de pastelería Jasiwood</h2>

            <p className="text-center">Hacemos todo tipo de panificados, facturas, pasteles para eventos y degustaciones!</p>

            <Productos destacados="true" />
        </>
    )
}

export default Home
