const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      loadContacts: () => {
        console.log("Cargando contactos...");
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        fetch(`https://playground.4geeks.com/contact/agendas/alex_80/contacts`, options)
          .then((response) => {
            if (response.status === 404) {
              console.log("La agenda no existe. Intentando crearla...");
              return getActions().createAgenda("alex_80");
            } else {
              return response.json();
            }

          })
          .then((data) => {
            if (data) {
              console.log("Contactos cargados correctamente:", data);
              setStore({ contacts: data.contacts });
              return true;
            } else {
              console.error("La respuesta no contiene contactos válidos.");
              return false;
            }
          })
          .catch((error) => {
            console.error("Error al cargar los contactos:", error);
            return false;
          });
      },

      createAgenda: (agendaName) => {
        console.log(`Creando la agenda: ${agendaName}...`);

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        };

        fetch(`https://playground.4geeks.com/contact/agendas/${agendaName}`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error al crear la agenda: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Agenda creada exitosamente:", data);
            getActions().loadContacts();
          })
          .catch((error) => {
            console.error("Error al crear la agenda:", error);
            return false;
          });
      },

      addContact: (newContact) => {
        console.log("Agregando nuevo contacto...");

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        };

        fetch(`https://playground.4geeks.com/contact/agendas/alex_80/contacts`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error("No se pudo agregar el contacto");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Nuevo contacto agregado:", data);
            const { contacts } = getStore();
            setStore({ contacts: [...contacts, data] });
          })
          .catch((error) => {
            console.error("Error al agregar el contacto:", error);
            return false;
          });
      },

      fetchDeleteContact: (id) => {
        const options = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        fetch(`https://playground.4geeks.com/contact/agendas/alex_80/contacts/${id}`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error al eliminar el contacto: ${response.statusText}`);
            } else {
              return response.text();
            }
          })
          .then((data) => {
            console.log(data)
            getActions().loadContacts()
            console.log(`Contacto con ID ${id} eliminado correctamente`);
          })
          .catch((error) => {
            console.error("Error al eliminar el contacto:", error);
          });
      },

      updateContact: (id, updatedContact, navigate = null) => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        };
        fetch(`https://playground.4geeks.com/contact/agendas/alex_80/contacts/${id}`, options)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error al actualizar el contacto: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(`Contacto con ID ${id} actualizado correctamente`, data);
            const { contacts } = getStore();
            const updatedContacts = contacts.map((contact) =>
              contact.id === id ? { ...contact, ...updatedContact } : contact
            );
            setStore({ contacts: updatedContacts });
            if (navigate) navigate("/");
          })
          .catch((error) => {
            console.error("Error al actualizar el contacto:", error);
          });
      },
    },
  };
};

export default getState;









