import React, { useEffect, useState, useContext } from "react";
import NavbarTop from "../components/NavBarTop";
import { CarritoContext } from "../context/CarritoContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
const API_URL = "https://backend-ev-final.onrender.com";

export default function Inicio() {
  const [bebidas, setBebidas] = useState([]);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // Obtener usuario desde localStorage
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/bebidas`)
      .then(res => res.json())
      .then(data => setBebidas(data))
      .catch(err => console.log("Error cargando bebidas:", err));
  }, []);

  // Manejar agregar al carrito solo si hay usuario
  const handleAgregar = (b) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      navigate("/pages/Login");
      return;
    }else if (usuario.rol !== false) {
      alert("Solo los clientes pueden agregar productos al carrito");
      return;
    }
    agregarAlCarrito(b);
  };

  return (
    <>
      <NavbarTop />

      <div style={{ paddingTop: "80px" }}>
        <div className="container">
          <h2 className="mt-3 mb-4 text-center fw-bold">Bebidas disponibles</h2>

          <div className="row g-4">
            {bebidas.map(b => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={b.id}>
                <div className="card h-100 shadow-sm">
                  <img 
                    src={`https://backend-ev-final.onrender.com${b.imagenUrl}`}
                    className="card-img-top"
                    alt={b.nombre}
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{b.nombre}</h5>
                    <p className="card-text fw-bold">${b.valor} USD</p>
                    <button className="btn btn-primary mt-auto" onClick={() => handleAgregar(b)}>
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
