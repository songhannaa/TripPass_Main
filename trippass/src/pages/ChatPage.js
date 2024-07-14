import React from "react";
import Layout from "../templates/Layout";
import DailyPlan from "../components/chatbot/DailyPlan";
import Chat from "../components/chatbot/Chat";
import styled from "styled-components";

const ChatPageContainer = styled.div`
  display: flex;
  height: 85vh;
  overflow: hidden;
  padding-bottom: 20px;
`;

const ChatSection = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 20px;
`;

const DailyPlanSection = styled.div`
  flex: 3;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const ChatPage = () => {
  return (
    <Layout>
      <ChatPageContainer>
        <ChatSection>
          <Chat />
        </ChatSection>
        <DailyPlanSection>
          <DailyPlan />
        </DailyPlanSection>
      </ChatPageContainer>
    </Layout>
  );
};

export default ChatPage;
