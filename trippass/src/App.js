// src/App.js
import React from "react";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardPage from "./pages/DashboardPage.js";
import LoginPage from "./pages/LoginPage.js";
import TripPlanPage from "./pages/TripPlanPage.js";
import TripCrewPage from "./pages/TripCrewPage.js";
import ChatPage from "./pages/ChatPage.js"
import UserPage from "./pages/UserPage.js"
import SignUpPage from "./pages/SignUpPage.js"
import AuthRoute from "./components/AuthRoute";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={isAuthenticated ? <DashboardPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<AuthRoute><DashboardPage /></AuthRoute>} />
        <Route path="/tripPlan" element={<AuthRoute><TripPlanPage /></AuthRoute>} />
        <Route path="/tripCrew" element={<AuthRoute><TripCrewPage /></AuthRoute>} />
        <Route path="/chat" element={<AuthRoute><ChatPage /></AuthRoute>} />
        <Route path="/user" element={<AuthRoute><UserPage /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
