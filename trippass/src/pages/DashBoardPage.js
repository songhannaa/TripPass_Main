import React, { Component } from "react";
import Layout from "../templates/Layout";
import DashBoard from "../components/Dashboard";

export default class DashBoardPage extends Component {
  render() {
    return (
      <Layout>
        <DashBoard />
      </Layout>
    );
  }
}
