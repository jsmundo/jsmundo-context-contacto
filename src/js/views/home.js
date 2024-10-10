import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import { ContactCard } from "../component/contactCard";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container my-5">
      <h1>esta es mi home</h1>
      <ContactCard/>
      <Link to="/editcontact">
        <button className="btn btn-success"> Edit Contact </button>
      </Link>
    </div>
  );
};

