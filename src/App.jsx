import { Routes, Route } from "react-router-dom";

import Home from './components/Home/Home';
import Layout from "./components/Layout/Layout";
import Productos from "./components/Productos/Productos";
import ProductoDetalle from "./components/Productos/ProductoDetalle/ProductoDetalle";
import Contacto from "./components/Contacto/Contacto";
import Carrito from "./components/Carrito/Carrito";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/Login/Login";
import Registro from "./components/Admin/Registro/Registro";
import ProductoTarjeta from "./components/Productos/ProductoTarjeta/ProductoTarjeta";


function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/jasiwoodstore/" element={<Home />} />
                <Route path="/jasiwoodstore/productos" element={<Productos />} />
                <Route path="/jasiwoodstore/producto-detalle/:id" element={<ProductoDetalle />} />
                <Route path="/jasiwoodstore/contacto" element={<Contacto />} />
                <Route path="/jasiwoodstore/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
                <Route path="/jasiwoodstore/registro" element={<Registro />} />
                <Route path="/jasiwoodstore/login" element={<Login />} />
                <Route path="/jasiwoodstore/admin" element={<ProtectedRoute roles={['admin', 'dataentry']}><Admin /></ProtectedRoute>} />
                <Route path="/jasiwoodstore/admin/producto-tarjeta/:id" element={<ProductoTarjeta />} />
            </Route>
        </Routes>
    )
}

export default App
