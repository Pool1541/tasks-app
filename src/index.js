import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Dashboard from "./routes/dashboard";
import RegisterUsername from "./routes/registerUsername";
import { ThemeContextProvider } from "./context/themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeContextProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Register-username" element={<RegisterUsername />} />
      </Routes>
    </HashRouter>
  </ThemeContextProvider>
);
