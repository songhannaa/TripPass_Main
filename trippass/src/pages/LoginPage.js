import React, { Component } from "react";
import Layout from "../templates/Layout";
import Login from "../components/Login";

export default class LoginPage extends Component {
  render() {
    return (
      <Layout>
        <Login /> 
      </Layout>
    );
  }
}
