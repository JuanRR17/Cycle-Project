import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import { SignUp } from "./pages/signup";
import { Login } from "./pages/login";
import Profile from "./pages/profile";
import ByProductForm from "./pages/byproduct_form";
import { List } from "./pages/prod_list";
import { Product } from "./pages/product";
import { Blog } from "./pages/blog";
import { BlogEntryForm } from "./pages/blog_entry_form";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<ByProductForm />} path="/byproduct_form" />
            <Route element={<List />} path="/prod_list" />
            <Route element={<Blog />} path="/blog" />
            <Route element={<BlogEntryForm />} path="/blog_entry_form" />
            <Route element={<Product />} path="/product/:id" />

            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
