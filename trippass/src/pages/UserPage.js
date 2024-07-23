import React from "react";
import Layout from "../templates/Layout";
import User from "../components/user/User.js"
import UserPersonality from "../components/user/UserPersonality.js";


const UserPage = () => {
  return (
    <Layout>
      <User />
      <UserPersonality />
    </Layout>
  );
};

export default UserPage;
