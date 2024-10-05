
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container">
      <h1 className="my-4">Demo Component</h1>
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
            {item.background === "orange" ? (
              <p style={{ color: item.initial }}>
                Check store/flux.js to see the action code
              </p>
            ) : null}
            <button
              className="btn btn-success"
              onClick={() => actions.changeColor(index, "orange")}
            >
              Change Color
            </button>
          </li>
        ))}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back Home</button>
      </Link>
    </div>
  );
};


