
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useNavigate } from "react-router-dom";

export const EditContact = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: "parra_alexander",
    id: null,
  });

  useEffect(() => {
    if (store.contacts && store.contacts.length > 0) {
      const foundContact = store.contacts.find(
        (item) => item.id === parseInt(id)
      );
      if (foundContact) {
        setContact(foundContact);
      } else {
        alert("Contact not found");
        navigate("/");
      }
    }
  }, [store.contacts, id, navigate]);

  const onSave = () => {
    actions
      .editContact(contact)
      .then((response) => {
        if (response === false) {
          alert("An error occurred while editing contact");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid min-vh-100 align-items-center bg-dark py-5">
      <div className="container d-flex flex-column bg-light my-5 pb-5 px-5">
        <h1 className="text-center mt-5">Edit Contact</h1>
        <div>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={contact.full_name}
              onChange={(e) =>
                setContact({
                  ...contact,
                  full_name: e.target.value,
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
            onClick={onSave}
            className="btn pt-1 mt-4 btn-primary form-control"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

