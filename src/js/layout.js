
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import { Contact } from "./views/contact";
import { Navbar } from "./component/navbar";
import { AddContact } from "./views/addContact";
import { EditContact } from "./views/editContact";
import { ContactCard } from "./component/contactCard";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addcontact" element={<AddContact />} />
          <Route path="/editcontact/:id" element={<EditContact />} />
          <Route path="/contactcard" element={<ContactCard />} />

          {/* Rutas para demo y single */}
          <Route path="/demo" element={<Demo />} />
          <Route path="/single/:index" element={<Single />} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);



