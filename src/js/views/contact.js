import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Contact = () => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar posibles errores

  useEffect(() => {
    if (store.contacts.length === 0) {
      // Si no hay contactos cargados, los cargamos
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

  if (loading) {
    return (
      <h1 className="d-flex justify-content-center">Loading contacts...</h1>
    ); // Mostrar mientras carga
  }

  if (error) {
    return (
      <h1 className="d-flex justify-content-center text-danger">{error}</h1>
    ); // Mostrar error si ocurre
  }

  if (!store.contacts || store.contacts.length === 0) {
    return (
      <h1 className="d-flex justify-content-center blueColor">
        <span className="whiteColor">&lt;</span>No contacts at the moment
        <span className="whiteColor"></span>
      </h1>
    );
  }

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          {store.contacts.map((contact) => (
            <ContactCard key={contact.id} id={contact.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
