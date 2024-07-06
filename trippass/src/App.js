import React from "react";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPage from "./pages/DashBoardPage.js";
import LoginPage from "./pages/LoginPage.js";
import TripPlanPage from "./pages/TripPlanPage.js";
import TripCrewPage from "./pages/TripCrewPage.js";
import ChatPage from "./pages/ChatPage.js"
import UserPage from "./pages/Userpage.js"
import SignUpPage from "./pages/SignUpPage.js"


function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/tripPlan" element={<TripPlanPage />} />
        <Route path="/tripCrew" element={<TripCrewPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
