import React, { Component } from "react";
import Layout from "../templates/Layout";
import TripCrew from "../components/TripCrew";

export default class TripCrewPage extends Component {
  render() {
    return (
      <Layout>
        <TripCrew />
      </Layout>
    );
  }
}
