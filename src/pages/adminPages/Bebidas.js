import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://backend-ev-final.onrender.com";

export default function Bebidas() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/bebidas`)
      .then(res => res.json())
      .then(data => setBebidas(data))
      .catch(err => console.log("Error cargando bebidas:", err));
  }, []);

  const guardarCambios = (id, bebidaActualizada) => {
    fetch(`${API_URL}/api/bebidas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bebidaActualizada)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al actualizar");
        alert("Bebida actualizada correctamente ✔");
      })
      .catch(err => alert("Error actualizando bebida: " + err));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-4">Administrar Bebidas</h1>

      <div className="table-responsive shadow-sm bg-white p-3 rounded">
        <table className="table align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Litros</th>
              <th>Valor (USD)</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {bebidas.map((b, index) => (
              <tr key={b.id}>
                <td>
                  <img
                    src={`https://backend-ev-final.onrender.com${b.imagenUrl}`}
                    alt={b.nombre}
                    style={{ width: "60px", height: "60px", objectFit: "contain" }}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={b.nombre}
                    onChange={(e) => {
                      const copia = [...bebidas];
                      copia[index].nombre = e.target.value;
                      setBebidas(copia);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    value={b.litros}
                    onChange={(e) => {
                      const copia = [...bebidas];
                      copia[index].litros = parseFloat(e.target.value);
                      setBebidas(copia);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={b.valor}
                    onChange={(e) => {
                      const copia = [...bebidas];
                      copia[index].valor = parseFloat(e.target.value);
                      setBebidas(copia);
                    }}
                  />
                </td>

                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      guardarCambios(b.id, {
                        nombre: bebidas[index].nombre,
                        litros: bebidas[index].litros,
                        valor: bebidas[index].valor,
                        imagenUrl: bebidas[index].imagenUrl
                      })
                    }
                  >
                    Guardar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
