import { React, useRef } from "react";
import { useMap, GeoJSON } from "react-leaflet";

const DEFAULT_STYLE = {
  fillColor: "#bcbcbc",
  weight: 3,
  opacity: 1,
  color: "#666",
  dashArray: "",
  fillOpacity: 0.5,
};

const HIGHLIGHT_STYLE = {
  weight: 3,
  color: "#3182CE",
  dashArray: "",
  fillOpacity: 0.5,
  fillColor: "#63B3ED",
};

const MapContents = ({ geoData, setDistrict }) => {
  const geoJsonRef = useRef();
  const map = useMap();
  let selectedDistrict = null;

  const hightlight = (e) => {
    const layer = e.target;
    layer.setStyle(HIGHLIGHT_STYLE);
  };

  const resetHighlight = (e) => {
    geoJsonRef.current.resetStyle(e.target);

    if (selectedDistrict) {
      selectedDistrict.setStyle({
        fillColor: "#2C5282",
      });
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: hightlight,
      mouseout: resetHighlight,
      click: onClick,
    });
  };

  const onClick = (e) => {
    map.fitBounds(e.target.getBounds());

    if (selectedDistrict) {
      geoJsonRef.current.resetStyle(selectedDistrict);
    }
    e.target.setStyle({
      fillColor: "#2C5282",
    });
    selectedDistrict = e.target;
    setDistrict(e.target.feature.properties.name);
  };

  return (
    <GeoJSON
      ref={geoJsonRef}
      data={geoData}
      style={DEFAULT_STYLE}
      onEachFeature={onEachFeature}
    />
  );
};

export default MapContents;
