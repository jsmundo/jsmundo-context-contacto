import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";

export const EditContact = () => {
  const { store } = useContext(Context);

  return (
    <div className="container my-5">
      <h1>esta es mi  pagina de editar contactos</h1>


<Link to="/contactCard">
        <button className="btn btn-success">  Contact card </button>
        </Link>
    </div>
  );
};
