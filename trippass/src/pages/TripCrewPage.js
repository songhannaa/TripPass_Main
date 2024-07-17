// import React from "react";
// import Layout from "../templates/Layout";
// import MyCrewList from "../components/tripcrew/MyCrewList";
// import SearchCrew from "../components/tripcrew/SearchCrew";

// const TripCrewPage = () => {
//   return (
//     <Layout>
//       <MyCrewList />
//       <SearchCrew />
//     </Layout>
//   );
// };

// export default TripCrewPage;

// src/pages/TripCrewPage.js

import React, { useState } from "react";
import Layout from "../templates/Layout";
import MyCrewList from "../components/tripcrew/MyCrewList";
import SearchCrew from "../components/tripcrew/SearchCrew";
import NewTripCrewPop from "../components/tripcrew/NewTripCrewPop";

const TripCrewPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
