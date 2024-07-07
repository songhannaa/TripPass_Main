import React from 'react';
import styled from 'styled-components';
import Layout from '../templates/Layout';
import DashboardBanner from '../components/dashboard/Banner';
import DashboardCalendar from '../components/dashboard/DashboardCalendar';
import Memo from '../components/dashboard/Memo';
import Map from '../components/dashboard/Map';
import DashboardTripCrew from '../components/dashboard/DashboardTripCrew';

const PageWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  flex: 6.5;
`;

const RightSection = styled.div`
  flex: 3.5;
`;

const BottomSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BottomLeftSection = styled.div`
  flex: 5.5;
  margin-right: 20px;
`;

const BottomRightSection = styled.div`
  flex: 4.5;
`;

const DashboardPage = () => {
  
  return (
    <Layout>
      <DashboardBanner />
      
      <PageWrapper>
        <LeftSection>
          <DashboardCalendar />
        </LeftSection>
        <RightSection>
          <Memo />
        </RightSection>
      </PageWrapper>
      
      <BottomSectionWrapper>
        <BottomLeftSection>
          <Map />
        </BottomLeftSection>
        <BottomRightSection>
          <DashboardTripCrew />
        </BottomRightSection>
      </BottomSectionWrapper>
      
    </Layout>
  );
};

export default DashboardPage;
