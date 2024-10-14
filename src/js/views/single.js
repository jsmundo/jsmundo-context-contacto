import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const { theid } = useParams(); // Obtiene el parámetro de la URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Validar si el parámetro es un número válido y existe en el array de demo
  useEffect(() => {
    if (store.demo.length > 0) {
      const demoElement = store.demo[parseInt(theid)];

      if (!demoElement) {
        setError("Demo element not found.");
      }
      setLoading(false); // Paramos la carga al encontrar o no el elemento
    } else {
      setLoading(false);
      setError("No demo data available.");
    }
  }, [store.demo, theid]);

  if (loading) {
    return <h1>Loading...</h1>; // Indicador de carga
  }

  if (error) {
    return <h1 className="text-danger">{error}</h1>; // Mensaje de error si no se encuentra el demo
  }

  // Asignamos el elemento del demo correspondiente
  const demoElement = store.demo[parseInt(theid)];

  return (
    <div className="jumbotron">
      <h1 className="display-4">
        This will show the demo element: {demoElement.title}
      </h1>
      <hr className="my-4" />
      <Link to="/">
        <button className="btn btn-primary btn-lg">Back home</button>
      </Link>
    </div>
  );
};
