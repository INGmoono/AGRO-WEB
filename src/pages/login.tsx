import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

        const usuarioValido = usuarios.find(
            (u: any) => u.email === email && u.password === password
        );

        if (usuarioValido) {
            alert(`Bienvenido, ${usuarioValido.nombre}`);
            localStorage.setItem('usuario_actual', JSON.stringify(usuarioValido));
            navigate('/productos');
        } else {
            alert('Correo o contraseña incorrectos');
        }
    };
    return (
        <div className="color-login">
            <div className="container-fluid ">
                <div className="row h-100">
                    {/* Columna izquierda: Formulario */}
                    <div className="col-md-6 d-flex align-items-center justify-content-center color-products">
                        <div
                            className="card px-5 py-5 shadow"
                            style={{ width: '100%', maxWidth: '600px' }}
                        >
                            <h2 className="text-center mb-4 fs-2 text-primario">Iniciar sesión</h2>
                            <form onSubmit={handleLogin}>
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
                                <button
                                    type="submit"
                                    className="btn btn-primario w-100 py-3 fs-4 mb-4"
                                >
                                    Entrar
                                </button>
                            </form>
                            <p className="text-center fs-5">
                                ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
                            </p>
                            
                        </div>
                    </div>

                    {/* Columna derecha: Imagen */}
                    <div className="col-md-6 d-none d-md-block p-0">
                        <img
                            src="/img/logo.jpg"
                            alt="Imagen de fondo"
                            className="img-fluid vh-100 w-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    {/*cards de informacion*/}
                    <div className="text-center mt-5 mb-5">
                        <h1 className="display-4 text-primario fw-bold" >¿Por qué usar AgroWeb?</h1>
                        <p className="fs-4 text-dark fw-bold">
                            Algunas de las muchas razones...
                        </p>
                    </div>
                    <div className="row mt-4">
                        {[
                            {
                                imagen: '/img/card1.jpg',
                                texto: 'Apoyas al campesino local, quien cada día se levanta temprano para trabajar la tierra con esfuerzo y dedicación. Al comprar directamente, reconoces su labor y ayudas a sostener las familias que viven del campo.',
                            },
                            {
                                imagen: '/img/card2.jpg',
                                texto: 'Obtienes un precio justo y económico, sin intermediarios que inflen el valor del producto. Solo tú y el campesino, conectados de manera directa y transparente.',
                            },
                            {
                                imagen: '/img/card3.jpg',
                                texto: 'Llevas a tu mesa productos saludables, frescos y 100% naturales, cultivados con cuidado y sin procesos industriales. Sabes de dónde viene lo que consumes y contribuyes a una alimentación más consciente.',
                            },
                        ].map((card, index) => (
                            <div className="col-12 col-md-4 mb-3" key={index}>
                                <div className="card border-0 overflow-hidden shadow-sm card-hover position-relative">
                                    <img
                                        src={card.imagen}
                                        className="w-100"
                                        style={{ height: '600px', objectFit: 'cover' }}
                                        alt={`Card ${index + 1}`}
                                    />
                                    <div className="overlay-text d-flex align-items-center justify-content-center text-white text-center px-2">
                                        <p className="m-0 fw-semibold fs-5">{card.texto}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
