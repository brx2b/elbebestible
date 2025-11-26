import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import { CarritoProvider } from './context/CarritoContext';
function App() {
  const API_URL="https://backend-ev-final.onrender.com"

  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/Registro" element={<Registro />} />

        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
