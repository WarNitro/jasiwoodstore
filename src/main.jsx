import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { CarritoProvider } from './context/CarritoContext'
import { AuthContext, AuthProvider } from './context/AuthContext';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CarritoProvider>
                    <App />
                </CarritoProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
