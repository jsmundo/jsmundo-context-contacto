//Muestra un solo contacto
import React, { useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ({ contact }) => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate(); // Usar useNavigate para redireccionar

  // Si no se encuentra el contacto
  if (!contact) return <p>Contact not found</p>;

  // Destructuramos las propiedades del contacto para simplificar el código
  const { name, phone, email, address, image } = contact;

  // Función para eliminar contacto y redirigir después
  const handleDelete = () => {
    actions.deleteContact(contact.id);
    navigate("/contact"); // Redirigir a la lista de contactos después de eliminar
  };

  return (
 
    <div>
    <div className="d-flex justify-content-end mb-3">
      <Link to="/addContact">
        <button className="btn btn-primary">Add Contact</button>
      </Link>
    </div>
  
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              image ||
              "https://images.pexels.com/photos/28808820/pexels-photo-28808820.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            }
            className="img-fluid rounded-start"
            alt={name || "Contact Image"}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">{name || "No name provided"}</h5>
              <p className="card-text">{phone || "No phone available"}</p>
              <p className="card-text">{email || "No email available"}</p>
              <p className="card-text">{address || "No address available"}</p>
            </div>
            <div>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
              <Link to={`/edit/${contact.id}`} className="btn btn-primary ms-2">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};  
