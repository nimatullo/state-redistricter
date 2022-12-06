// Base
import React from "react";

// Custom
import "../../assets/styles/homepage.css";
import Sidebar from "./Sidebar.jsx";

import OUR_STATES from "../../assets/ourStates";
import StateBreakdown from "../data display/StateBreakdown.jsx";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const Homepage = ({ setTooltipContent }) => {
  const [page, setPage] = React.useState();

  const renderPage = () => {
    const stateData = OUR_STATES[page.toLowerCase()];
    return <StateBreakdown state={stateData} />;
  };

  return (
    <div className="main">
      <Sidebar setPage={setPage} />
      {page ? renderPage() : <USMap setPage={setPage} />}
    </div>
  );
};

const USMap = ({ setPage }) => {
  const stateFullNames = Object.values(OUR_STATES).map(
    (state) => state.fullName
  );
  return (
    <ComposableMap projection={"geoAlbersUsa"}>
      <Geographies
        geography={"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"}
      >
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#FFF"
                fill={
                  stateFullNames.includes(geo.properties.name)
                    ? "#e63f4e"
                    : "#DDD"
                }
                onClick={() => {
                  const state = Object.values(OUR_STATES).find(
                    (state) => state.fullName === geo.properties.name
                  );
                  if (state) {
                    setPage(state.abrv);
                  }
                }}
              />
            ))}
            {geographies.map((geo) => {
              const cur = stateFullNames.find(
                (state) => state === geo.properties.name
              );
              const centroid = geoCentroid(geo);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur && (
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={8} textAnchor="middle">
                        {cur}
                      </text>
                    </Marker>
                  )}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default Homepage;
