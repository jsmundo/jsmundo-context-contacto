//Muestra un solo contacto
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactCard = ( contact ) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); // Usar useNavigate para redireccionar
  const [contactId, setContactId] = useState (null)
  

  // Función para eliminar contacto y redirigir después
  const handleDelete = () => {
    actions.deleteContact(contact.contacto.id);
    alert("contacto eliminado")
   // navigate("/contact"); // Redirigir a la lista de contactos después de eliminar
  };

  return (
 
    <div>
   
  
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content align align-items-center">
          <img
            src=
            
              "https://images.pexels.com/photos/28808820/pexels-photo-28808820.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
            
            className="img-fluid rounded-circle"
            alt="foto de contacto"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body d-flex justify-content-between">
            <div>
              <h5 className="card-title">{ contact.contacto.name }</h5>
              <p className="card-text">{contact.contacto.phone }</p>
              <p className="card-text">{contact.contacto.email }</p>
              <p className="card-text">{contact.contacto.address }</p>
            </div>
            <div>
              <button onClick={()=>actions.fetchDeleteContact(contact.contacto.id)} className="btn btn-danger">
                Delete
              </button>
              <Link to={`/editcontact/${contact.contacto.id}`} className="btn btn-primary ms-2">
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
