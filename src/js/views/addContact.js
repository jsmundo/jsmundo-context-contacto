//aqui va el formulario para agragar los contactos

import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useContext(Context); // Acceso a las acciones del contexto
  const navigate = useNavigate(); // Para redirigir después de agregar el contacto

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga mientras se agrega el contacto
  const [error, setError] = useState(""); // Estado para mostrar errores si algo falla

  // Función para guardar el contacto
  const onSave = () => {
    // Validación simple para asegurarse de que los campos están completos
    if (contact.name === "" || contact.email === "" || contact.phone === "" || contact.address === "") {
      alert("Please fill in all the fields before saving.");
      return;
    }

    // Establecer el estado de carga
    setLoading(true);
    setError(""); // Limpiar cualquier error anterior

    // Llama a la acción para agregar el contacto
    actions
      .addContact({
        full_name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
      })
      .then(() => {
        // Limpiar los campos después de guardar
        setContact({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
        // Redirigir a la lista de contactos después de agregar exitosamente
        navigate("/contact");
      })
      .catch((err) => {
        setError("There was an error adding the contact. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Detener el estado de carga
      });
  };

  return (
    <div className="container-fluid min-vh-100 align-items-center bg-dark py-5">
      <div className="container d-flex flex-column bg-light my-5 pb-5 px-5">
        <h1 className="text-center mt-5">Add a new contact</h1>
        <div>
          {error && <p className="text-danger text-center">{error}</p>} {/* Mostrar error si ocurre */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={contact.name}
              onChange={(e) =>
                setContact({
                  ...contact,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={contact.email}
              onChange={(e) =>
                setContact({
                  ...contact,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Enter phone"
              value={contact.phone}
              onChange={(e) =>
                setContact({
                  ...contact,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              value={contact.address}
              onChange={(e) =>
                setContact({
                  ...contact,
                  address: e.target.value,
                })
              }
            />
          </div>
          <button
            type="button"
            onClick={onSave}
            className="btn pt-1 mt-4 btn-primary form-control"
            disabled={loading} // Deshabilitar el botón mientras se guarda el contacto
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/contactCard")}
            className="btn btn-primary mt-4"
          >
             or get back to contacts
          </button>

        </div>
      </div>
    </div>
  );
};


