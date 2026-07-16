// src/componentes/Registro/Registro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { useAuth } from '../../../context/AuthContext';


function Registro() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const { registrar } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            await registrar(email, password);

            navigate('/jasiwoodstore/');
        } 
        catch (error) {
            
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm('Este correo electrónico ya está registrado. ¿Desea iniciar sesión?');
            
                if (quiereLoguearse) {
                    navigate('/jasiwoodstore/login');
                }
                else {
                    navigate('/jasiwoodstore/');
                }
            } 
            else {
                console.error("Error en el registro:", error.message);
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
            }
        }
    };

    return (
        <>
            <h2 className="text-center">Crear una nueva cuenta</h2>

            <div className="row justify-content-center mt-3">
                <form className="form col-md-6 bg-white border shadow-lg p-3" onSubmit={handleSubmit}>
                    {error && <div className="error-message mb-3">{error}</div>}
                    <div className="form-group mb-3">
                        <label for="producto-unidad" className="form-label">Correo Electrónico</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Ej: persona@ejemplo.com" className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label for="password" className="form-label">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Mínimo 6 caracteres" className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
            </div>
        </>
    );
};

export default Registro;
