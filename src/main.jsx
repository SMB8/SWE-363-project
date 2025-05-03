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
import ProtectedRoute from "./ProtectedRoute.jsx";

//routes 
// root (checked)
// sign-in (checked)
// sign-up
// events
// profile
//manage events
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<Signin />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <MangeEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
