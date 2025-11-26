import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://backend-ev-final.onrender.com";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    correo: "",
    contrasenna: "",
    rol: false
  });

  useEffect(() => {
    fetch(`${API_URL}/api/personas`)
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.log("Error cargando usuarios:", err));
  }, []);

  const guardarCambios = (id, personaActualizada) => {
    fetch(`${API_URL}/api/personas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personaActualizada),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al actualizar");
        alert("Usuario actualizado ✔");
      })
      .catch(err => alert("Error actualizando usuario: " + err));
  };

  // 🔥 NUEVA FUNCIÓN PARA ELIMINAR USUARIO
  const eliminarUsuario = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    fetch(`${API_URL}/api/personas/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Error al eliminar");
        setUsuarios(prev => prev.filter(u => u.id !== id));
        alert("Usuario eliminado ✔");
      })
      .catch(err => alert("Error eliminando usuario: " + err));
  };

  const agregarUsuario = () => {
    if (!nuevo.nombre || !nuevo.correo || !nuevo.contrasenna) {
      alert("Completa todos los campos");
      return;
    }

    fetch(`${API_URL}/api/personas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al crear usuario");
        return res.json();
      })
      .then(data => {
        setUsuarios(prev => [...prev, data]);

        setNuevo({
          nombre: "",
          correo: "",
          contrasenna: "",
          rol: false
        });

        alert("Usuario creado con éxito ✔");
      })
      .catch(err => alert("Error creando usuario: " + err));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-4">Administrar Usuarios</h1>

      {/* TABLA */}
      <div className="table-responsive shadow-sm bg-white p-3 rounded mb-5">
        <table className="table align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Rol (Admin)</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u, index) => (
              <tr key={u.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={u.nombre}
                    onChange={(e) => {
                      const copia = [...usuarios];
                      copia[index].nombre = e.target.value;
                      setUsuarios(copia);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="email"
                    className="form-control"
                    value={u.correo}
                    onChange={(e) => {
                      const copia = [...usuarios];
                      copia[index].correo = e.target.value;
                      setUsuarios(copia);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={u.contrasenna}
                    onChange={(e) => {
                      const copia = [...usuarios];
                      copia[index].contrasenna = e.target.value;
                      setUsuarios(copia);
                    }}
                  />
                </td>

                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={u.rol}
                    onChange={(e) => {
                      const copia = [...usuarios];
                      copia[index].rol = e.target.checked;
                      setUsuarios(copia);
                    }}
                  />
                </td>

                {/* 🔥 BOTONES: GUARDAR + ELIMINAR */}
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        guardarCambios(u.id, {
                          nombre: usuarios[index].nombre,
                          correo: usuarios[index].correo,
                          contrasenna: usuarios[index].contrasenna,
                          rol: usuarios[index].rol
                        })
                      }
                    >
                      Guardar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarUsuario(u.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULARIO NUEVO USUARIO */}
      <div className="shadow-sm bg-light p-4 rounded border">
        <h4 className="fw-bold mb-3">Agregar nuevo usuario</h4>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={nuevo.correo}
              onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Contraseña</label>
            <input
              type="text"
              className="form-control"
              value={nuevo.contrasenna}
              onChange={(e) =>
                setNuevo({ ...nuevo, contrasenna: e.target.value })
              }
            />
          </div>

          <div className="col-md-2 d-flex align-items-center">
            <div className="form-check mt-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={nuevo.rol}
                onChange={(e) =>
                  setNuevo({ ...nuevo, rol: e.target.checked })
                }
              />
              <label className="form-check-label">Admin</label>
            </div>
          </div>

          <div className="col-md-12 text-end">
            <button className="btn btn-primary" onClick={agregarUsuario}>
              Agregar Usuario
            </button>
          </div>
        </div>
      </div>

      <br /><br />
    </div>
  );
}
