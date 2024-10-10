
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home";

import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import{ContactCard} from "./component/contactCard";
import { AddContact } from "./component/addContact";
import { EditContact } from "./views/editContact";


const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editcontact/:id" element={<EditContact />} /> 
          <Route path="/contact/:id" element={<ContactCard />} /> 
          <Route path="/addcontact" element={<AddContact />} /> 
          <Route path="/demo" element={<Demo />} />
          <Route path="/single/:index" element={<Single />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);


