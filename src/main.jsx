import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./config/firebase-config";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Sketch from "./pages/Sketch";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sketch" element={<Sketch />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
