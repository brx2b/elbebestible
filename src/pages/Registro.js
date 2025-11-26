import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://backend-ev-final.onrender.com";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasenna, setContrasenna] = useState("");
  const [error, setError] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !correo || !contrasenna) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/personas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          correo,
          contrasenna,
          rol: false,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("ERROR DEL BACKEND:", txt);
        setError(txt);
        return;
      }

      navigate("/pages/Login");
    } catch {
      setError("Error conectando con el servidor.");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Imagen izquierda */}
      <div
        className="flex-grow-1 d-none d-md-block"
        style={{
          backgroundImage: "url('/imgs/fondo_login.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Link to="/">
  <img
    src="/imgs/fechita_izquierda.png"
    style={{ cursor: "pointer", width: "60px", margin: "20px" }}
  />
</Link>
      </div>

      {/* Formulario derecha */}
      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ width: "45%" }}
      >
        <div className="card shadow p-4 w-75">
          <h2 className="text-center fw-bold mb-4">Crear Cuenta</h2>

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <form onSubmit={handleRegistro}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="ejemplo@mail.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={contrasenna}
                onChange={(e) => setContrasenna(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="btn btn-dark w-100">Registrarse</button>
          </form>

          <div className="mt-3 text-center">
            <Link to="/pages/Login">¿Ya tienes cuenta? Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
