// En /context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }

    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(true);

    const auth = getAuth(); 

    const registrar = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    
    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

            if (currentUser) {
                await getDoc(doc(db, "roles", currentUser.uid))
                .then((respuesta) => {
                    console.log(respuesta);
                    if (respuesta.exists()) {
                        // tengo asignado un rol especial, se lo agrego al user
                        setUser({ ...currentUser, rol:  respuesta.data().rol });
                    }
                    else {
                        // no tiene rol, usuario comun
                        setUser({ ...currentUser, rol: 'user' });
                    }
                    console.log(user);
                    setCargando(false);
                })
                .catch((err) => {
                    console.error("Error: ", err.message);
                });
            }
            else {
                setUser(null);
                setCargando(false);
            }
        });
        
        return () => unsubscribe();
    }, 
        [auth, db]
    );

    return (
        <AuthContext.Provider value={{ user, cargando, registrar, login, logout }}>
            {!cargando && children}
        </AuthContext.Provider>
    );
};