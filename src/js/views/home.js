import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/contactCard";

export const Home = () => {
  const { store, actions } = useContext(Context);
   useEffect(()=>{
    actions.loadContacts()
   },[])


  return (
    <div className="container my-5">
      <h1 className="text-center">Contact List</h1>
      <div className="d-flex justify-content-end mb-3">
      <Link to="/addcontact">
        <button className="btn btn-primary">Add Contact</button>
      </Link>
    </div>

      <div className="row">
        {store.contacts.map((contact, index) => (
          <div className="" key={index}>
            <ContactCard contacto={contact}  />
          </div>
        ))}
      </div>
    </div>
  );
};
