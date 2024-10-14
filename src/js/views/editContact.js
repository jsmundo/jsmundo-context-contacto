import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Encontrar el contacto actual para editarlo
  const contact = store.contacts.find((contact) => contact.id === parseInt(id));

  // Estado local para manejar los campos del formulario
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Prellenar el formulario con los datos del contacto existente
  useEffect(() => {
    if (contact) {
      setContactDetails({
        name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      });
      setLoading(false);
    } else {
      setError("Contact not found");
      setLoading(false);
    }
  }, [contact]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar los cambios realizados
  const onSave = () => {
    if (
      contactDetails.name === "" ||
      contactDetails.email === "" ||
      contactDetails.phone === "" ||
      contactDetails.address === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Llamar a la acción para actualizar el contacto
    actions
      .updateContact(id, {
        full_name: contactDetails.name,
        email: contactDetails.email,
        phone: contactDetails.phone,
        address: contactDetails.address,
      })
      .then(() => {
        navigate("/contact"); // Redirigir a la lista de contactos después de guardar
      })
      .catch(() => {
        setError("Error updating contact");
      });
  };

  if (loading) {
    return <h1>Loading contact data...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

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
