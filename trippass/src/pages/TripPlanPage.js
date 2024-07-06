import React, { Component } from "react";
import Layout from "../templates/Layout";
import TripPlan from "../components/TripPlan";

export default class TripPlanPage extends Component {
  render() {
    return (
      <Layout>
        <TripPlan />
      </Layout>
    );
  }
}
