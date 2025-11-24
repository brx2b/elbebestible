import NavbarTop from "../components/NavBarTop"


import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const API_URL="https://backend-ev-final.onrender.com"
export default function Inicio() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/bebidas`)
      .then(res => res.json())
      .then(data => setBebidas(data))
      .catch(err => console.log("Error cargando bebidas:", err));
  }, []);

  return (
    <>
      <NavbarTop />

      {/* Esto empuja el contenido hacia abajo porque navbar es fixed */}
      <div style={{ paddingTop: "80px" }}>
        <div className="container">

          <h2 className="mb-4 text-center fw-bold">
            Bebidas disponibles
          </h2>

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
                    <p className="card-text fw-bold">${b.valor}</p>

                    <button className="btn btn-primary mt-auto">
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
