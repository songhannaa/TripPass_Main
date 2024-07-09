// src/App.js
import React, { useState } from "react";
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
import styled from "styled-components";
import mouseCursor from "./assets/mouseBot.png";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const Pointer = styled.img`
  width: 50px; /* 이미지의 크기를 조정할 수 있습니다 */
  height: 50px; /* 이미지의 크기를 조정할 수 있습니다 */
  position: absolute;
  pointer-events: none;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
  z-index: 9999;
`;

function App() {
  const [xy, setXY] = useState({ x: 0, y: 0 });

  const xyHandler = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setXY({ x: mouseX, y: mouseY });
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Container onMouseMove={xyHandler}>
      <GlobalStyle />
      <Pointer src={mouseCursor} x={xy.x} y={xy.y} />
      <BrowserRouter>
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
    </Container>
  );
}

export default App;
