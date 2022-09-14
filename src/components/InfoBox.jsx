import React from "react";
// import allData from "../../dummy_json/all_cd.json";

const InfoBox = ({ state }) => {
  const getDistrictData = (key) => {
    const stateData = allData[state][key];

    // Iterate over all keys in the state data
    return Object.keys(stateData)
      .map((key) => {
        if (key.includes("Estimate")) {
          return stateData[key];
        }
      })
      .filter((item) => item !== undefined);
  };

  return (
    <div className="info-box leaflet-top leaflet-right">
      {state && allData[state] ? (
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
      )}
    </div>
  );
};

export default InfoBox;
