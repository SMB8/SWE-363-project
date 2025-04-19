import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./home/header.jsx";
import Signin from "./pages/Signin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <Router>
    <Header />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes>
    </Router>
  </StrictMode>
);
