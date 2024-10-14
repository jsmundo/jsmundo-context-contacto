const API_URL = "https://playground.4geeks.com/contact/agendas/";

const apiRequest = (url, options = {}) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error; // Lanzamos el error para que las promesas puedan manejarlo
    });
};

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      demo: [
        {
          title: "First Element",
          background: "white",
          initial: "white",
        },
        {
          title: "Second Element",
          background: "white",
          initial: "white",
        },
      ],
      agenda: "alex_28", 
    },
    actions: {
      loadContacts: () => {
        const { agenda } = getStore();
        return apiRequest(`${API_URL}${agenda}`) // Devolvemos la promesa
          .then((data) => {
            console.log(data)
            setStore({ contacts: data });
            return data; // Devolvemos los datos para poder manejarlos en los componentes
          })
          .catch((error) => {
            console.log("Error loading contacts:", error);
            throw error; // Lanzamos el error para manejarlo en los componentes
          });
      },

      addContact: (contact) => {
        const { agenda, contacts } = getStore();
        return apiRequest(`${API_URL}${agenda}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        })
          .then((data) => {
            setStore({ contacts: [...contacts, data] });
            return data; // Devolvemos el nuevo contacto
          })
          .catch((error) => {
            console.log("Error adding contact:", error);
            throw error;
          });
      },

      deleteContact: (id) => {
        const { agenda, contacts } = getStore();
        return apiRequest(`${API_URL}${agenda}/contacts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        })
          .then(() => {
            const newContacts = contacts.filter((contact) => contact.id !== id);
            setStore({ contacts: newContacts });
          })
          .catch((error) => {
            console.log("Error deleting contact:", error);
            throw error;
          });
      },

      updateContact: (id, updatedContact) => {
        const { agenda, contacts } = getStore();
        return apiRequest(`${API_URL}${agenda}/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedContact),
        })
          .then((data) => {
            const updatedContacts = contacts.map((contact) =>
              contact.id === id ? { ...contact, ...data } : contact
            );
            setStore({ contacts: updatedContacts });
            return data; // Devolvemos el contacto actualizado
          })
          .catch((error) => {
            console.log("Error updating contact:", error);
            throw error;
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

