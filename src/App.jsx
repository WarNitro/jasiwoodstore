//import './App.css'
import Home from './components/Home/Home.jsx'
import Layout from "./components/Layout/Layout.jsx"
import Productos from "./components/Productos/Productos.jsx"
import ProductoDetalle from "./components/Productos/ProductoDetalle/ProductoDetalle.jsx"
import Contacto from "./components/Contacto/Contacto.jsx"
import Admin from "./components/Admin/Admin.jsx"
import ProductoTarjeta from "./components/Productos/ProductoTarjeta/ProductoTarjeta.jsx"

import { Routes, Route } from "react-router-dom"

function App() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/jasiwoodstore/" element={<Home />} />
                <Route path="/jasiwoodstore/productos" element={<Productos />} />
                <Route path="/jasiwoodstore/producto-detalle/:id" element={<ProductoDetalle />} />
                <Route path="/jasiwoodstore/contacto" element={<Contacto />} />
                <Route path="/jasiwoodstore/carrito" element={<Home />} />
                <Route path="/jasiwoodstore/admin" element={<Admin />} />
                <Route path="/jasiwoodstore/admin/producto-tarjeta/:id" element={<ProductoTarjeta />} />
            </Route>
        </Routes>
    )
}

export default App
