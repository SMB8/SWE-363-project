import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Profile from "./pages/Profile.jsx";
import Header from "./home/header.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import MangeEvent from "./pages/ManageEvent.jsx";
import EventsPage from "./events/eventsPage.jsx";
import HomePage from "./home/home-page.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/manage" element={<MangeEvent />} />
      </Routes>
    </Router>
  </StrictMode>
);
