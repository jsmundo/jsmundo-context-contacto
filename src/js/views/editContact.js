import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
   const navigate = useNavigate();

  // Encontrar el contacto actual para editarlo
 
  // // // Estado local para manejar los campos del formulario
   const [contactDetails, setContactDetails] = useState({
    name: "",
     email: "",
     phone: "",
     address: "",
  });

  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState("");

  // Prellenar el formulario con los datos del contacto existente
  useEffect(() => {
   setContactDetails(store.contacts.find((contact) => contact.id === parseInt(id)))
  }, []);

  // Manejar cambios en los campos del formulario
 const handleChange = (e) => {
     setContactDetails({
       ...contactDetails,
       [e.target.name]: e.target.value,
   });
   };

  // Guardar los cambios realizados
  const onSave = () => {
    actions
      .updateContact(id,contactDetails,navigate)
  };

  return (
    <div className="container my-5">
      <h1>Edit Contact: {contactDetails.name}</h1>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={contactDetails.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={contactDetails.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="phone"
          className="form-control"
          name="phone"
          value={contactDetails.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={contactDetails.address}
          onChange={handleChange}
        />
      </div>
      <button onClick={onSave} className="btn btn-primary mt-3">
        Save Changes
      </button>
    </div>
  );
};
