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
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7,
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
          onEachFeature={onEachFeature}
        />
        <InfoBox data={selectedState} />
      </MapContainer>
    </div>
  );
};

export default Map;
