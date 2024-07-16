import React, { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardPage from "./pages/DashboardPage.js";
import LoginPage from "./pages/LoginPage.js";
import Redirect from "./components/login/Redirect.js";
import Logout from "./components/login/Logout.js";
import MyTripPage from "./pages/MyTripPage.js";
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
  width: 50px;
  height: 50px;
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
          <Route path="/login/kakao" element={<Redirect />} />
          <Route path="/logout/kakao" element={<Logout />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<AuthRoute><DashboardPage /></AuthRoute>} />
          <Route path="/myTrip" element={<AuthRoute><MyTripPage /></AuthRoute>} />
          <Route path="/tripCrew" element={<AuthRoute><TripCrewPage /></AuthRoute>} />
          <Route path="/chat" element={<AuthRoute><ChatPage /></AuthRoute>} />
          <Route path="/user" element={<AuthRoute><UserPage /></AuthRoute>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
