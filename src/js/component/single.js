// Single.js
import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
  const { index } = useParams();
  const { store } = useContext(Context);
  const item = store.demo[index];

  if (!item) {
    return <div className="container">Item not found</div>;
  }

  return (
    <div className="container">
      <h1>{item.title}</h1>
      <p>
        This is the detail view of <strong>{item.title}</strong>.
      </p>
      <Link to="/demo">
        <button className="btn btn-primary">Back to Demo</button>
      </Link>
    </div>
  );
};
