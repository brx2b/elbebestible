import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavbarTop() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <a className="navbar-brand" href="/">El Bebestible</a>
        
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
            <li className="nav-item"><a className="nav-link" href="/carrito">Carrito</a></li>
            <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
            <li className="nav-item"><a className="nav-link" href="/registro">Registro</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
