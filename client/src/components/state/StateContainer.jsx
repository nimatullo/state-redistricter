import { Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import StateSidebar from "./StateSidebar";
import Map from "../maps/Map";
import StateOverview from "./StateOverview";
import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import OUR_STATES from "../../assets/ourStates";
import UniqueDistrictPlan from "./UniqueDistrictPlan";

const StateContainer = () => {
  return (
    <Grid gridTemplateColumns={"1fr 3fr 2fr"}>
      <StateSidebar />
      <div
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </div>
      <Map />
    </Grid>
  );
};

export default StateContainer;
