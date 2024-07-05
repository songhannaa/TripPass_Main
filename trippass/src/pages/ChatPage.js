import React, { Component } from "react";
import Layout from "../templates/Layout";
import Chat from "../components/Chat";

export default class ChatPage extends Component {
  render() {
    return (
      <Layout>
        <Chat />
      </Layout>
    );
  }
}
