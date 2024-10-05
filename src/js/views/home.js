// Home.js
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/Card";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store } = useContext(Context);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-primary" to="/add-contact">
          Add New Contact
        </Link>
      </div>
      <ul className="list-group">
        {store.contacts.map((contact) => (
          <Card key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

