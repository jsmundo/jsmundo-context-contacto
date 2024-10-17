const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      contacto: {},
      demo: [],
    },
    actions: {
      loadContacts: () => {
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        fetch(
          `https://playground.4geeks.com/contact/agendas/alex_31/contacts`,
          options
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("la respuesta no fue exsitosa");
            }
            return response.json();
          })
          .then((data) => {
            console.log("RESPUESTA:", data.contacts);
            setStore({ contacts: data.contacts });
          })
          .catch((error) => {
            console.error("hubo un problema con:", error);
          });
      },
      addContact: (newContact) => {
        const options = {
          method: "POST", // para enviar un nuevo contacto
          headers: {
            "Content-Type": "application/json", // digo estoy enviando datos en formato json
          },
          body: JSON.stringify(newContact), // aqui estoy convirtiendo el objeto del nuevo contacto en el lenguaje que entiede el servidor json
        };
             fetch(
          `https://playground.4geeks.com/contact/agendas/alex_31/contacts`,
          options
        )
          .then((response) => {
            if (!response.ok) {
              // aqui le digo si las cosas no salen bien que mostraerme el error
              throw new Error("No se pudo agregar el contacto");
            }
            return response.json(); // aqui le digo que me combierta la respuesta del servidor en json
          })
          .then((data) => {
            console.log("nuevo contacto agregado:", data); // mostramos el contacto que fue agrgado
            const { contacts } = getStore(); // obtenemos la lista de contactos
            setStore({ contacts: [...contacts, data] }); // aqui estamos  agregando un nuevo contacto
          })
          .catch((error) => {
            console.error("Error al agregar el contacto", error); // mostramos el error si algo salio mal
          });
      },

      fetchDeleteContact: (id) => {
        const { contacts } = getStore();
        const newContact = contacts.filter((contact) => contact.id !== id); // borrar articulos de la lista
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
        };
        fetch(
          `https://playground.4geeks.com/contact/agendas/alex_31/contacts/${id}`,
          requestOptions
        )
          .then(() => {
            setStore({ contacts: newContact });
            getActions().loadContacts();
          })
          .catch((error) => console.error(error));
      },

      updateContact: (id, updatedContact,navigate) => {
        const options = {
          method: "PUT", // SE USA PARA ACTUILIZAR MIS CONTACTOS
          headers: {
            "Content-Type": "application/json", // indicamos que en viamos la informacion en formato json
          },
          body: JSON.stringify(updatedContact), // aqui se combierten los datos del contacto actulizado a json
        };
            fetch(
          `https://playground.4geeks.com/contact/agendas/alex_31/contacts/${id}`,
          options
        )
          .then((response) => {
            if (!response.ok) {
              // si algo no va bien
              throw new Error("No se pudo actualizar el contacto");
            }
            return response.json(); // aqui estamos conviertiendo la respuesta en json
          })
          .then((data) => {
            console.log(`Contacto con ID ${id} actualizado`, data); // me muestra que enverdad fue actulizado
            const { contacts } = getStore(); // obtengo la lista de contactos actual
            const updatedContacts = contacts.map((contact) =>
              contact.id === id ? { ...contact, ...updatedContact } : contact
            ); // aqui desimos que solo actualizamos el contacto con el id indicado
            setStore({ contacts: updatedContacts }); // aqui guardamos la nueva lista actualizada
            navigate("/")
          })
          .catch((error) => {
            console.error("Error al actulizar el contacto:", error); // captamos el error si algo sale mal
          });
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((item, i) => {
          if (i === index) item.background = color;
          return item;
        });
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
