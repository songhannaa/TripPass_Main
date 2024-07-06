import React, { Component } from "react";
import Layout from "../templates/Layout";
import SignUp from "../components/SignUp";

export default class SignUpPage extends Component {
  render() {
    return (
      <Layout>
        <SignUp />
      </Layout>
    );
  }
}
