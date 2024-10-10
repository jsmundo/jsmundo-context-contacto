//aqui va el componente card que deberia renderisar los datos de mi contacto
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams(); // Obtener el id de la URL

  // Buscar el contacto correspondiente en el estado global usando el id
  const contact = store.contacts.find((contact) => contact.id === parseInt(id));

  // Verificación del prop contact
  if (!contact) return <p>Contact not found</p>;

  return (
    <div className="container d-flex justify-content-center m-4">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={
                contact.image ||
                "https://images.pexels.com/photos/28808820/pexels-photo-28808820.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
              }
              className="img-fluid rounded-start"
              alt={contact.full_name || "Contact Image"}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {contact.full_name || "No name provided"}
              </h5>
              <p className="card-text">
                {contact.phone || "No phone available"}
              </p>
              <p className="card-text">
                {contact.email || "No email available"}
              </p>
              <button
                onClick={() => actions.deleteContact(contact.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
              <Link to={`/edit/${contact.id}`} className="btn btn-primary">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
