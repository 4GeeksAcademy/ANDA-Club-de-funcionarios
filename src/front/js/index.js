//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import your own components
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import Layout from "./layout"; // Import Layout

//render your react application
ReactDOM.render(
  <BrowserRouter>  {/* Envuelve el componente Layout en BrowserRouter */}
    <Layout />
  </BrowserRouter>,
  document.querySelector("#app")
);
