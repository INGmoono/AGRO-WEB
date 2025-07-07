import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const Registro: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Leer usuarios existentes
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');

        // Verificar si ya existe el correo
        const existe = usuariosGuardados.some((usuario: any) => usuario.email === email);
        if (existe) {
            alert('Ya existe un usuario con este correo.');
            return;
        }

        // Agregar nuevo usuario
        const nuevoUsuario = { nombre, email, password };
        usuariosGuardados.push(nuevoUsuario);

        // Guardar en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        alert('Usuario registrado exitosamente');
        setNombre('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center color-login">
            <div className="card px-5 py-5 shadow text-white" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="text-center mb-4 fs-2 text-primario">Registro</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="form-label fs-4">Nombre completo</label>
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            id="nombre"
                            placeholder="Campesino Feliz"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label fs-4">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="ejemplo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fs-4">Contraseña</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            placeholder="xxxxxx"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primario w-100 py-3 fs-4 mb-3">
                        Registrarse
                    </button>
                </form>
                <p className="text-center fs-5 text-black">
                    ¿Ya tienes cuenta? <Link to="/" className="text-decoration-none text-primario">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Registro;
