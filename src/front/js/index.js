//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import Layout from "./layout"; // Import Layout

//render your react application
const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
