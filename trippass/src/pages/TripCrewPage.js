import React from "react";
import Layout from "../templates/Layout";
import MyCrewList from "../components/tripcrew/MyCrewList";
import SearchCrew from "../components/tripcrew/SearchCrew";

const TripCrewPage = () => {

  return (
    <Layout>
      <MyCrewList/>
      <SearchCrew />
    </Layout>
  );
};

export default TripCrewPage;