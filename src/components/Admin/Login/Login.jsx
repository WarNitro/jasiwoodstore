import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { useAuth } from '../../../context/AuthContext';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, password)
        .then((userCredential) => {
            // cambia el estado de Auth y el onAuthStateChanged graba en el user en el context
            const user = userCredential.user;
            console.log("Usuario logueado:", user);

            navigate('/jasiwoodstore/');
        })
        .catch((error) => {
            console.error("Error en el login:", error.code, error.message);
            //setError("Error: " + error.message); // puede ser peligroso mostrar el error sin tratar?
            setError('Ocurrió un error al loguearse con el usuario. Verifique los datos e intente nuevamente.');
        });

    };

    return (
        <>
            <h2 className="text-center">Iniciar Sesión</h2>

            <div className="row justify-content-center  mt-3">
                <form className="form col-md-6 bg-white border shadow-lg p-3" onSubmit={ handleLogin }>
                    {error && <div className="error-message mb-3">{error}</div>}
                    <div className="form-group mb-3">
                        <label for="producto-unidad" className="form-label">Correo Electrónico:</label>
                        <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label for="producto-unidad" className="form-label">Contraseña:</label>
                        <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
            </div>
        </>
    );
};

export default Login;
