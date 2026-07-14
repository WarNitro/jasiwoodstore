

export function FormularioProducto({ producto, manejarCambio, manejarEnvio }) {

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '24rem',
        margin: '3rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        gap: '16px'
    };

    return (
        <form style={ formStyle } onSubmit={ manejarEnvio }>
            <h3>Agregar Nuevo Producto</h3>
            <div>
                <label>Nombre del Producto:</label>
                <input type="text" placeholder="Ej: Teclado Mecánico" name="nombre" value={producto.nombre} onChange={manejarCambio} />
            </div>
            <div>
                <label>Unidad:</label>
                <input type="text" placeholder="Ej: docena, kg" name="unidad" value={producto.unidad} onChange={manejarCambio} />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" placeholder="Ej: 95" name="precio" value={producto.precio} onChange={manejarCambio} />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" placeholder="Ej: 5" name="stock" value={producto.stock} onChange={manejarCambio} />
            </div>
            <div>
                <label>Imagen:</label>
                <input type="file" placeholder="https://…" name="imagenNueva" accept="image/png, image/jpeg" onChange={manejarCambio} />
            </div>
            <div>
                <label>Destacado:</label>
                <input type="checkbox" name="destacado" value={producto.destacado} onChange={manejarCambio} />
            </div>
            <div>
                <label>Descripcion:</label>
                <textarea placeholder="Ej: El mejor teclado mecanico" name="descripcion" value={producto.descripcion} onChange={manejarCambio}></textarea>
            </div>
            <input type="hidden" name="id" value={producto.id} />
            <input type="hidden" name="id" value={producto.imagen} />
            <button type="submit">Guardar Producto</button>
        </form>
    );
}
