import React, { useState, useEffect } from 'react';

const FetchContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "";
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch contacts. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setContacts(data); // Almacena los contactos en el estado
      })
      .catch(error => {
        setError(error.message); // Maneja cualquier error
      });
  }, []); // Ejecuta solo una vez al montar el componente

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FetchContacts;
