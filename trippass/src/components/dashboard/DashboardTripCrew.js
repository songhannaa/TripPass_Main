import React from "react";
import "../../styles/memo.css";
import { FaAddressBook } from 'react-icons/fa'; 

const DashboardTripCrew = () => {
  return (
    <div className="memo">
      <div className="memoTitle">
        <span>마이 트립 크루</span>
        <button className="editButton">
          <FaAddressBook />
        </button>
      </div>
    </div>
  );
};

export default DashboardTripCrew;
