import React from "react";
import styled from 'styled-components'
import bannerImage from "../../assets/banner.png"
import bot from "../../assets/bot1.png"
import { useSelector } from 'react-redux';

const BannerWrapper = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;
  display: flex;
  border-radius: 15px;
  position: relative;
`;

const BannerText = styled.div`
  font-weight: bold;
  position: absolute;
  left: 3%;
  bottom: -11%;
  background: rgba(255, 255, 255, 0.80059);
  box-shadow: 0px 9px 17px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(13.5914px);
  border-radius: 12px;
  width: 94%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const DashboardBanner = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  return (
      <>
      <BannerWrapper>
      {isAuthenticated && (
      <BannerText>
        <img src={bot} alt="여행봇" />
        안녕하세요 {user.nickname}님! 함께 여행 계획을 만들어 떠나볼까요?
      </BannerText>
      )}
      </BannerWrapper>    
      </>

  );
};

export default DashboardBanner;


