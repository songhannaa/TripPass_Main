import React, { useState } from "react";
import Layout from "../templates/Layout";
import MyCrewList from "../components/tripcrew/MyCrewList";
import SearchCrew from "../components/tripcrew/SearchCrew";
import NewTripCrewPop from "../components/tripcrew/NewTripCrewPop";

const TripCrewPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fetchCrewData, setFetchCrewData] = useState(null);

  const openPopup = (fetchCrewDataFunc) => {
    setFetchCrewData(() => fetchCrewDataFunc);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    if (fetchCrewData) fetchCrewData();
  };

  return (
    <Layout>
      <MyCrewList openPopup={openPopup} />
      <SearchCrew />
      {isPopupOpen && <NewTripCrewPop onClose={closePopup} />}
    </Layout>
  );
};

export default TripCrewPage;
