import React, { useState, useEffect } from 'react';

interface Producto {
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    publicadoPor: string;
    email: string;
}

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState<string>('');

    useEffect(() => {
        const guardados = JSON.parse(localStorage.getItem('productos') || '[]');
        setProductos(guardados);
    }, []);

    const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const agregarProducto = (e: React.FormEvent) => {
        e.preventDefault();

        const usuario = JSON.parse(localStorage.getItem('usuario_actual') || '{}');
        const nuevoProducto = {
            nombre,
            precio: Number(precio),
            imagen,
            descripcion,
            publicadoPor: usuario.nombre || 'Desconocido',
            email: usuario.email || 'No registrado',
        };

        const nuevosProductos = [...productos, nuevoProducto];
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));

        setNombre('');
        setDescripcion('');
        setPrecio('');
        setImagen('');
        (document.getElementById('imagen') as HTMLInputElement).value = '';
    };

    return (
        <div className="color-products py-5 min-vh-100">
            <div className="container py-5">
                <h2 className="mb-4 text-center text-primario">🌿 Productos disponibles</h2>

                <div className="text-center mb-4">
                    <button
                        className="btn btn-primario px-4 py-2 fs-5"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#formularioProducto"
                        aria-expanded="false"
                        aria-controls="formularioProducto"
                    >
                        ➕ Agregar nuevo producto
                    </button>
                </div>

                <div className="collapse" id="formularioProducto">
                    <div className="card shadow-lg border-0 mb-5">
                        <div className="card-body bg-light rounded">
                            <h4 className="mb-4 text-secundario">🛒 Nuevo producto</h4>
                            <form onSubmit={agregarProducto}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Nombre del producto"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            placeholder="Precio en pesos"
                                            value={precio}
                                            onChange={(e) => setPrecio(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            className="form-control form-control-lg"
                                            rows={3}
                                            placeholder="Descripción del producto"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            id="imagen"
                                            accept="image/*"
                                            onChange={handleImagen}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 text-end">
                                        <button type="submit" className="btn btn-success btn-lg px-5">
                                            ✅ Publicar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Tarjetas de productos */}
                <div className="row">
                    {productos.length === 0 && (
                        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center w-100">
                            <img
                                src="/img/empty-box.png"
                                alt="Sin productos"
                                style={{ width: '120px', opacity: 0.5, marginBottom: '20px' }}
                            />
                            <h4 className="text-muted">No hay productos disponibles aún.</h4>
                            <p className="text-secondary">Publica el primero usando el botón de arriba ⬆️</p>
                        </div>
                    )}

                    {productos.map((producto, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100 shadow border-0">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="card-img-top"
                                    style={{ height: '220px', objectFit: 'cover' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-secundario fw-bold">{producto.nombre}</h5>
                                    <p className="card-text">{producto.descripcion}</p>
                                    <p className="card-text text-primario fw-bold mb-1">
                                        💰 Precio: ${producto.precio}
                                    </p>
                                    <hr />
                                    <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                                        Publicado por: <strong>{producto.publicadoPor}</strong><br />
                                        <span className="fst-italic">{producto.email}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Productos;
