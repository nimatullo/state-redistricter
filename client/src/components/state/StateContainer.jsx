import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import StateSidebar from "./StateSidebar";
import Map from "../maps/Map";
import StateSummary from "../data display/StateSummary";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import OUR_STATES from "../../assets/ourStates";
import StateCompactness from "./StateCompactness";

const StateContainer = () => {
  const [currentState, setCurrentState] = useState("");
  const [currentView, setCurrentView] = useState("summary");
  const params = useParams();
  const views = {
    summary: <StateSummary state={currentState} />,
    compactness: <StateCompactness state={currentState} />,
  };

  useEffect(() => {
    setCurrentState(OUR_STATES[params.state].name);
  });

  return (
    <Grid gridTemplateColumns={"1fr 3fr 2fr"}>
      <StateSidebar currentView={currentView} setView={setCurrentView} />
      {views[currentView]}
      <Map />
    </Grid>
  );
};

export default StateContainer;
