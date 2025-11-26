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
        body: JSON.stringify({ correo:email, contrasenna:contrasena }),
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
                required
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
                required
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
  );
}
