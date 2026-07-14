

export function FormularioProducto({ producto, manejarCambio, manejarEnvio }) {

    return (
        <form onSubmit={ manejarEnvio }>
            <h3>Agregar Nuevo Producto</h3>
            <div className="mb-3">
                <label for="producto-nombre" className="form-label">Nombre del Producto:</label>
                <input id="producto-nombre" type="text" name="nombre" value={producto.nombre} onChange={manejarCambio} required className="form-control" />
            </div>
            <div className="mb-3">
                <label for="producto-unidad" className="form-label">Unidad:</label>
                <input id="producto-unidad" type="text" placeholder="Ej: docena, kg" name="unidad" value={producto.unidad} onChange={manejarCambio} required className="form-control" />
            </div>
            <div className="mb-3">
                <label for="producto-precio" className="form-label">Precio:</label>
                <input id="producto-precio" type="number" min="0" name="precio" value={producto.precio} onChange={manejarCambio} required className="form-control" />
            </div>
            <div className="mb-3">
                <label for="producto-stock" className="form-label">Stock:</label>
                <input id="producto-stock" type="number" min="0" name="stock" value={producto.stock} onChange={manejarCambio} required className="form-control" />
            </div>
            <div className="mb-3">
                <label for="producto-imagen" className="form-label">Imagen:</label>
            {producto.imagen != '' && (
                <img src={ producto.imagen } alt={ producto.nombre } width="100" height="100" />
            )}
                <input id="producto-imagen" type="file" placeholder="https://…" name="imagenNueva" onChange={manejarCambio} className="form-control" />
            </div>
            <div className="mb-3 form-check">
                <label for="producto-destacado" className="form-check-label">Producto Destacado</label>
                <input id="producto-destacado" type="checkbox" name="destacado" defaultChecked={ producto.destacado } onChange={manejarCambio} className="form-check-input" />
            </div>
            <div className="mb-3">
                <label for="producto-descripcion" className="form-label">Descripcion:</label>
                <textarea id="producto-descripcion" name="descripcion" value={producto.descripcion} onChange={manejarCambio} className="form-control" rows="3"></textarea>
            </div>
            <input type="hidden" name="id" value={producto.id} />
            <input type="hidden" name="id" value={producto.imagen} />
            <button type="submit" className="btn btn-primary">Guardar Producto</button>
        </form>
    );
}
