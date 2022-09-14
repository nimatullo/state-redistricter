// Base
import React from "react";
import { Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Custom
import ArkansasIcon from "../../assets/img/ArkansasIcon.jsx";
import FloridaIcon from "../../assets/img/FloridaIcon.jsx";
import NorthCarolinaIcon from "../../assets/img/NorthCarolinaIcon.jsx";
import "../../assets/styles/homepage.css";

const Homepage = () => {
  const navigation = useNavigate();

  const goTo = (state) => {
    navigation(`/map/${state}`);
  };

  return (
    <div className="main">
      <div className="states">
        <div className="state">
          <Heading>Arkansas</Heading>
          <ArkansasIcon onClick={() => goTo("ar")} />
        </div>
        <div className="state">
          <Heading>Florida</Heading>
          <FloridaIcon onClick={() => goTo("fl")} />
        </div>
        <div className="state">
          <Heading>North Carolina</Heading>
          <NorthCarolinaIcon onClick={() => goTo("nc")} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
