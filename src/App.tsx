import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Registro from './pages/signup';
import Productos from './pages/productos';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/productos" element={<Productos />} />
            </Routes>
        </Router>
    );
}

export default App;
