import React, { Component } from "react";
import Layout from "../templates/Layout";
import User from "../components/User";

export default class UserPage extends Component {
  render() {
    return (
      <Layout>
        <User />
      </Layout>
    );
  }
}
