import { React, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import DistrictsService from "../services/districtsService";

import InfoBox from "./InfoBox";

import "../styles/map.css";
import { useEffect } from "react";

const OUR_STATES = [
  {
    abrv: "FL",
    districts: 27,
  },
  {
    abrv: "NC",
    districts: 13,
  },
  {
    abrv: "AR",
    districts: 4,
  },
];

const Map = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [geoData, setGeoData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let geojson = [];
    for (const state of OUR_STATES) {
      const stateDistricts = await DistrictsService.getGeoJSONForState(
        state.abrv,
        state.districts
      );
      geojson = geojson.concat(stateDistricts);
    }
    setGeoData(geojson);
  };

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

  const style = (feature) => {
    return {
      fillColor: OUR_STATES.includes(feature.properties.name)
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
    geoData && (
      <div className="map">
        <MapContainer
          center={[40.8312778554, -73.4564453081]}
          zoom={5}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Puffer Labs, LLC.'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            ref={geoJsonRef}
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
          <InfoBox state={selectedState} />
        </MapContainer>
      </div>
    )
  );
};

export default Map;
