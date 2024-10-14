import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/contactCard";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar posibles errores

  // Cargar contactos al montar el componente
  useEffect(() => {
    if (store.contacts.length === 0) {
      actions
        .loadContacts()
        .then(() => {
          setLoading(false); // Parar el estado de carga cuando terminen de cargarse
        })
        .catch(() => {
          setError("There was an error loading contacts.");
          setLoading(false); // Parar el estado de carga en caso de error
        });
    } else {
      setLoading(false); // Si los contactos ya están cargados, no necesitamos hacer fetch
    }
  }, [store.contacts, actions]);
  console.log(store.contacts)
  // Mostrar estado de carga
  if (loading) {
    return (
      <h1 className="d-flex justify-content-center">Loading contacts...</h1>
    );
  }

  // Mostrar error si ocurre
  if (error) {
    return (
      <h1 className="d-flex justify-content-center text-danger">{error}</h1>
    );
  }

  // Si no hay contactos disponibles
  if (!store.contacts || store.contacts.length === 0) {
    return (
      <h1 className="d-flex justify-content-center">No contacts available</h1>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center">Contact List</h1>

      <div className="row">
        {store.contacts.map((contact) => (
          <div className="" key={contact.id}>
            <ContactCard contact={contact} />

          </div>
        ))}
      </div>
    </div>
  );
};
