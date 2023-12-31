import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import "./config/firebase-config";

import Home from "./pages/Home";
import Sketch from "./pages/Sketch";
import MySketches from "./pages/MySketches";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sketch/new" element={<Sketch />} />
        <Route path="/sketch/:sketch_id" element={<Sketch />} />
        <Route path="/my-sketches" element={<MySketches />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
