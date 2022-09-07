import React from "react";

const InfoBox = ({ data, scope }) => {
  let infoBox;
  if (data) {
    infoBox = (
      <div>
        <h2>{data}</h2>
      </div>
    );
  } else {
    infoBox = <h2>Select a state</h2>;
  }
  return <div className="info-box leaflet-top leaflet-right">{infoBox}</div>;
};

export default InfoBox;
