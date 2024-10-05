
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { AddContact } from "./views/AddContact";
import { EditContact } from "./views/EditContact";
import { Demo } from "./views/Demo";
import { Single } from "./views/Single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/single/:index" element={<Single />} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);


