import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function ProtectedRoute({ roles, children }) {

    const { user, cargando } = useAuth();
    
    if (cargando) {
        return <div>Cargando...</div>;
    }

    if (!user) {
        console.log("no user auth");
        return <Navigate to="/jasiwoodstore/login" />;
    }
    else if((roles && !roles.includes(user.rol))) {
        console.log("no role allowed");
        return <Navigate to="/jasiwoodstore/login" />;
    }
    
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;