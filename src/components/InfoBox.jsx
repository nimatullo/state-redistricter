import React from "react";
import { useEffect } from "react";
import DataJSON from "../../dummy_json/data.json";
import DistrictService from "../services/districtsService";

const InfoBox = ({ state }) => {
  const getDistrictData = (key) => {
    // const stateData = allData[state][key];
    // // Iterate over all keys in the state data
    // return Object.keys(stateData)
    //   .map((key) => {
    //     if (key.includes("Estimate")) {
    //       return stateData[key];
    //     }
    //   })
    //   .filter((item) => item !== undefined);
  };

  return (
    <div className="info-box leaflet-top leaflet-right">
      {state ? (
        <>
          <h1>Race breakdown</h1>
          {DataJSON.map((item) => {
            return (
              <div>
                <h2>{item.Race}</h2>
                <p>Population: {item.Population.toLocaleString()}</p>
                <p>% of population: {item.Percentage}</p>
              </div>
            );
          })}
        </>
      ) : (
        <h2>Select a state</h2>
      )}

      {/* {state && allData[state] ? (
        <>
          <div>
            <h2>{state}</h2>
            <b>People {allData[state]["People"]["Title"]}</b>
            {getDistrictData("People").map((item, i) => (
              <p key={i}>
                District {i + 1}: {item}
              </p>
            ))}
          </div>
        </>
      ) : (
        <h2>Select a state</h2>
      )} */}
    </div>
  );
};

export default InfoBox;
