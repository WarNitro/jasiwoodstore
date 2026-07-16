import GestionProductos from './GestionProductos/GestionProductos';
import GestionCupones from './GestionCupones/GestionCupones';


function Admin() {

    return (
        <>
            <h2 className="text-center">Administración del Sitio</h2>
            
            <GestionProductos />
            <GestionCupones />

            
            <div id="deleteModal" className="fade modal" tabIndex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Desea eliminar el producto?</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Se eliminara el producto permanentemente.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;