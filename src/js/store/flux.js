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
      contact: [],
      agenda: "alex_26",
    },
    actions: {
      // ... acciones existentes
      examplefunction: () => {
        getActions().changeColor(0, "green");
      },
      getAgenda: () => {
        const { agenda } = getStore();
        fetch(
          `https://playground.4geeks.com/contact/agendas/${agenda}/contacts`
        )
          .then((Response) => Response.json())
          .then((data) => setStore({ contact: data }))
          .catch((error) => console.log(error));
      },
      addContact: (contact) => {
        const { agenda, contacts } = getState();
        fetch(
          `https://playground.4geeks.com/contact/agendas/${agenda}/contacts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        )
          .then((Response) => Response.json())
          .then((data) => setStore({ contacts: [...contacts, data] }))
          .then((error) => console.log(error));
      },
      deleteContact: (id) => {
        const { agenda, contacts } = getStore();
        fetch(
          `https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then(() => {
            const newContacts = contacts.filter((contact) => contact.id !== id);
            setStore({ contacts: newContacts });
          })
          .catch((e) => {
            console.log(e);
          });
      },

      updateContact: (id, updatedContact) => {
        const { agenda, contacts } = getStore();
        fetch(
          `https://playground.4geeks.com/contact/agendas/${agenda}/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Actualiza el estado del contacto modificado en el array de contactos
            const updatedContacts = contacts.map((contact) =>
              contact.id === id ? data : contact
            );
            setStore({ contacts: updatedContacts });
          })
          .catch((error) => console.log(error));
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
