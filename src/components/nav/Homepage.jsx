// Base
import React from "react";

// Custom
import "../../assets/styles/homepage.css";
import Sidebar from "./Sidebar.jsx";

import OUR_STATES from "../../assets/ourStates.js";
import StateBreakdown from "../data display/StateBreakdown.jsx";

const Homepage = () => {
  const [page, setPage] = React.useState("ar");

  const renderPage = () => {
    const stateData = OUR_STATES[page.toLowerCase()];
    return <StateBreakdown state={stateData} />;
  };

  return (
    <div className="main">
      <Sidebar setPage={setPage} />
      {renderPage()}
    </div>
  );
};

export default Homepage;
