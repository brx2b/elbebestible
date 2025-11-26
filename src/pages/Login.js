import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://backend-ev-final.onrender.com";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !contrasena) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/personas/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email, contrasenna: contrasena }),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("ERROR DEL BACKEND:", txt);
        setError(txt);
        return;
      }

      const user = await res.json();
      localStorage.setItem("usuario", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError("Error conectando con el servidor.");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-0 vh-100">

        {/* Imagen en pantallas md+ */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: "url('/imgs/fondo_login.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to="/">
            <img
              src="/imgs/fechita_izquierda.png"
              alt="volver"
              style={{ cursor: "pointer", width: "60px", margin: "20px" }}
            />
          </Link>
        </div>

        {/* Formulario */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-light p-4">
          <div className="card shadow p-4 w-100" style={{ maxWidth: "380px" }}>
            
            {/* Imagen visible solo en móviles */}
            <div className="text-center d-md-none mb-3">
              <img
                src="/imgs/fondo_login.jpg"
                alt="preview"
                style={{ width: "80%", borderRadius: "10px" }}
              />
            </div>

            <h2 className="text-center fw-bold mb-4">Iniciar Sesión</h2>

            {error && (
              <div className="alert alert-danger py-2 text-center">{error}</div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@mail.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <button className="btn btn-dark w-100">Ingresar</button>
            </form>

            <div className="mt-3 text-center">
              <Link to="/pages/Registro">¿No tienes cuenta? Regístrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
