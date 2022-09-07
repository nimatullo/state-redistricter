import { React, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import InfoBox from "./InfoBox";

import geodata from "../assets/geo.json";
import "../styles/map.css";

const Map = () => {
  const [selectedState, setSelectedState] = useState(null);

  const geoJsonRef = useRef();

  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      color: "#f38613",
      dashArray: "",
      fillOpacity: 0.5,
      fillColor: "#f9cb9c",
    });
  };

  const resetHighlight = (e) => {
    geoJsonRef.current.resetStyle(e.target);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: () => {
        setSelectedState(feature.properties.name);
      },
    });
  };

  const isAmazingState = (state) => {
    return (
      state === "New York" || state === "Florida" || state === "South Carolina"
    );
  };

  const style = (feature) => {
    return {
      fillColor: isAmazingState(feature.properties.name)
        ? "#ffd966"
        : "#bcbcbc",
      weight: 3,
      opacity: 1,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.5,
    };
  };

  return (
    <div className="map">
      <MapContainer center={[40.9048, -73.124]} zoom={5} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Puffer Labs, LLC.'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          ref={geoJsonRef}
          data={geodata}
          style={style}
          onEachFeature={onEachFeature}
        />
        <InfoBox state={selectedState} />
      </MapContainer>
    </div>
  );
};

export default Map;
