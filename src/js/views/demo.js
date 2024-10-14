import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar los datos del demo si es necesario
  useEffect(() => {
    if (store.demo.length === 0) {
      // Si no hay datos, cargarlos (esto depende de cómo se maneje en el flux)
      actions
        .loadDemo()
        .then(() => setLoading(false))
        .catch(() => {
          setError("Failed to load demo data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [store.demo, actions]);

  // Mostrar mensaje de carga
  if (loading) {
    return <h1>Loading Demo Data...</h1>;
  }

  // Mostrar mensaje de error
  if (error) {
    return <h1 className="text-danger">{error}</h1>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Demo Component</h1>

      {/* Si no hay elementos en el demo */}
      {store.demo.length === 0 ? (
        <p>No demo items available</p>
      ) : (
        <ul className="list-group">
          {store.demo.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ background: item.background }}
            >
              <Link to={`/single/${index}`}>
                <span>Link to: {item.title}</span>
              </Link>
              {item.background === "orange" && (
                <p style={{ color: item.initial }}>
                  Check store/flux.js to see the action code
                </p>
              )}
              <button
                className="btn btn-success"
                onClick={() => actions.changeColor(index, "orange")}
              >
                Change Color
              </button>
            </li>
          ))}
        </ul>
      )}

      <br />
      <Link to="/">
        <button className="btn btn-primary">Back Home</button>
      </Link>
    </div>
  );
};
