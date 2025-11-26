import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, Button } from "react-bootstrap";

export default function NavbarTop() {
  const navigate = useNavigate();
  const { carrito, agregarCantidad, disminuirCantidad, eliminarDelCarrito } =
    useContext(CarritoContext);

  const [show, setShow] = useState(false);
  const [usuario, setUsuario] = useState(null);

  // Revisar sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/");
  };
  
  const handleShowCarrito = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para ver el carrito");
      navigate("/pages/Login");
      return;
    }
    setShow(true);
  };

  const handleAgregarCantidad = (id) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar al carrito");
      navigate("/pages/Login");
      return;
    }
    agregarCantidad(id);
  };

  const handleDisminuirCantidad = (id) => {
    if (!usuario) {
      alert("Debes iniciar sesión para modificar el carrito");
      navigate("/pages/Login");
      return;
    }
    disminuirCantidad(id);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div className="container">
          <Link className="navbar-brand" to="/">El Bebestible</Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* CARRITO - solo para usuarios normales */}
              {!usuario?.rol && (
                <li className="nav-item">
                  <Button
                    variant="link"
                    className="nav-link text-white"
                    onClick={handleShowCarrito}
                  >
                    Carrito
                  </Button>
                </li>
              )}

              {/* ADMINISTRADOR */}
              {usuario?.rol === true && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-warning" to="/pages/adminPages/bebidas">
                      Administrar Bebidas
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-warning" to="/pages/adminPages/usuarios">
                      Administrar Usuarios
                    </Link>
                  </li>
                </>
              )}

              {/* USUARIO LOGUEADO */}
              {usuario ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      Hola, {usuario.nombre}
                    </span>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link text-white"
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pages/Login">
                      Iniciar Sesión
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/pages/Registro">
                      Registro
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* OFFCANVAS DEL CARRITO — solo aparece si NO es admin */}
      {!usuario?.rol && (
        <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Tu Carrito</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {carrito.length === 0 ? (
              <p>Carrito vacío</p>
            ) : (
              carrito.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <strong>{item.nombre}</strong>
                    <div className="d-flex align-items-center mt-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleDisminuirCantidad(item.id)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.cantidad}</span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAgregarCantidad(item.id)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-end">
                    <span>${(item.valor * item.cantidad).toFixed(2)}</span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      x
                    </Button>
                  </div>
                </div>
              ))
            )}

            {carrito.length > 0 && (
              <div className="fw-bold mt-3">
                Total: $
                {carrito
                  .reduce((acc, item) => acc + item.valor * item.cantidad, 0)
                  .toFixed(2)}

                <div>
                  <Button
                    variant="success"
                    className="mt-3 w-100"
                    onClick={() => alert("¡Gracias por tu compra!")}
                  >
                    Proceder al Pago
                  </Button>
                </div>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </>
  );
}
