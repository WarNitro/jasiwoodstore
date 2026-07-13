import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/config';
import { useAuth } from '../../../context/AuthContext';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        login(email, password)
        .then((userCredential) => {
            // cambia el estado de Auth y el onAuthStateChanged graba en el user en el context
            const user = userCredential.user;
            console.log("Usuario logueado:", user);

            navigate('/jasiwoodstore/admin');
        })
        .catch((error) => {
            console.error("Error en el login:", error.code, error.message);
            alert("Error: " + error.message);
        });

    };

    return (
        <>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={ handleLogin }>
                Usuario: <input type="email" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                Comtraseña: <input type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">Ingresar</button>
            </form>
        </>
    );
};

export default Login;
