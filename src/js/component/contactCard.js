//Muestra un solo contacto
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ( contact ) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Usar useNavigate para redireccionar
  
  // Función para eliminar contacto y redirigir después
  const handleDelete = () => {
    actions.deleteContact(contact.contacto.id);
    alert("contacto eliminado")
   // navigate("/contact"); // Redirigir a la lista de contactos después de eliminar
  };

  return (
 
    <div>
  <div className="card mb-3">
    <div className="d-flex align-items-center p-3">
      <div className="contact-image me-3">
        <img
          src="https://images.pexels.com/photos/28808820/pexels-photo-28808820.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
          className="img-fluid rounded-circle"
          alt="foto de contacto"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
      <div className="flex-grow-1">
        <h5 className="card-title mb-1">{contact.contacto.name}</h5>
        <p className="card-text mb-1">{contact.contacto.phone}</p>
        <p className="card-text mb-1">{contact.contacto.email}</p>
        <p className="card-text mb-0">{contact.contacto.address}</p>
      </div>
      <div>
        <button onClick={() => actions.fetchDeleteContact(contact.contacto.id)} className="btn btn-danger me-2">
          Delete
        </button>
        <Link to={`/editcontact/${contact.contacto.id}`} className="btn btn-primary">
          Edit
        </Link>
      </div>
    </div>
  </div>
</div>
  );
};  
