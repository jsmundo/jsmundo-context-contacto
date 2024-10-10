//aqui va el formulario para agragar los contactos

import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const AddContact = () => {
  const { actions } = useContext(Context); // Acceso a las acciones del contexto
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Función para guardar el contacto
  const onSave = () => {
    // Validación simple para asegurarse de que los campos están completos
    if (
      contact.name === "" ||
      contact.email === "" ||
      contact.phone === "" ||
      contact.address === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Llama a la acción para agregar el contacto
    actions.addContact({
      full_name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    });

    // Limpiar los campos después de guardar
    setContact({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };
  return (
    <div className="container-fluid min-vh-100 align-items-center bg-dark py-5 ">
      <div className="container d-flex flex-column bg-light my-5 pb-5 px-5  ">
        <h1 className="text-center mt-5">Add a new contact</h1>
        <div>
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
            onClick={() => {
              onSave();
            }}
            className="btn pt-1 mt-4 btn-primary form-control"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};
