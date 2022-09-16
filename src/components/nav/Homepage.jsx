// Base
import React from "react";

// Custom
import ArkansasIcon from "../../assets/img/ArkansasIcon.jsx";
import FloridaIcon from "../../assets/img/FloridaIcon.jsx";
import NorthCarolinaIcon from "../../assets/img/NorthCarolinaIcon.jsx";
import "../../assets/styles/homepage.css";
import ArkansasBreakdown from "../statebreakdown/ArkansasBreakdown.jsx";
import FloridaBreakdown from "../statebreakdown/FloridaBreakdown.jsx";
import NorthCarolinaBreakdown from "../statebreakdown/NorthCarolina.jsx";
import Sidebar from "./Sidebar.jsx";

const Homepage = () => {
  const [page, setPage] = React.useState("ak");

  const renderPage = () => {
    switch (page) {
      case "Arkansas":
        return <ArkansasBreakdown />;
      case "Florida":
        return <FloridaBreakdown />;
      case "North Carolina":
        return <NorthCarolinaBreakdown />;
      default:
        return <ArkansasBreakdown />;
    }
  };

  return (
    <div className="main">
      <Sidebar setPage={setPage} />
      {renderPage()}
    </div>
  );
};

export default Homepage;
