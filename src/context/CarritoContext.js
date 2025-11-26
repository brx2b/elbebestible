// context/CarritoContext.js
import React, { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar un item (o aumentar cantidad si ya existe)
  const agregarAlCarrito = (item) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === item.id);
      if (existe) {
        return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...item, cantidad: 1 }];
    });
  };

  // Aumentar cantidad de un item
  const agregarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad + 1 } : i)
    );
  };

  // Disminuir cantidad de un item (y eliminar si llega a 0)
  const disminuirCantidad = (id) => {
    setCarrito(prev =>
      prev
        .map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i)
        .filter(i => i.cantidad > 0)
    );
  };

  // Eliminar item del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(i => i.id !== id));
  };
  // Finalizar compra
  const vaciarCarrito = () => {
    setCarrito([]);
  };


  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      agregarCantidad,
      disminuirCantidad,
      eliminarDelCarrito,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
};
