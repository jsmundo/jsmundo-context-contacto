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
    slug:"alex_31"
  });

     const handleChange = (e) => {
      setContact({...contact, [e.target.name]: e.target.value})
     }

     const handleSubmit = (e) => {
        e.preventDefault(); 
        
         
        actions.addContact(contact)
      
    
         
        navigate("/");
     }
  // // Función para guardar el contacto
  // const onSave = () => {
  //   // Validación simple para asegurarse de que los campos están completos
  //   if (contact.name === "" || contact.email === "" || contact.phone === "" || contact.address === "") {
  //     alert("Please fill in all the fields before saving.");
  //     return;
  //   } 
  //   setLoading(true)
    // Llama a la acción para agregar el contacto
    // actions
    //   .addContact({
    //     name: contact.name,
    //     email: contact.email,
    //     phone: contact.phone,
    //     address: contact.address,
    //   })
    //    .then(() => {
    //   //   // Limpiar los campos después de guardar
    //   //   setContact({
    //   //     name: "",
    //   //     email: "",
    //   //     phone: "",
    //   //     address: "",
    //   //   });
    //     setLoading (false); // desactivar estado de carga
    //     // Redirigir a la lista de contactos después de agregar exitosamente
    //   navigate("/");
    //   })  
  
  return (
    <div className="container-fluid min-vh-100 align-items-center bg-dark py-5">
      <div className="container d-flex flex-column bg-light my-5 pb-5 px-5">
        <h1 className="text-center mt-5">Add a new contact</h1>
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              name="name"
              value={contact.name}
              onChange={handleChange
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={contact.email}
              onChange={handleChange
              }
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="phone"
              className="form-control"
              placeholder="Enter phone"
              name="phone"
              value={contact.phone}
              onChange={handleChange
              }
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              name="address"
              value={contact.address}
              onChange={handleChange
              }
            />
          </div>
           <button
            type="submit"
      
            className="btn pt-1 mt-4 btn-primary form-control"
            
          >
            save
          </button> 

          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-primary mt-4"
          >
             or get back to contacts
          </button>

        </form>
      </div>
    </div>
  );
};


