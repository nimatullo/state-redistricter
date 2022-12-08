import { React, useContext, useEffect, useRef } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import { useMapContext } from "../../services/mapContext";

const DEFAULT_STYLE = {
  weight: 2,
  opacity: 1,
  color: "#666",
  fillOpacity: 0.5,
};

const HIGHLIGHT_STYLE = {
  // weight: 3,
  // color: "#008000",
  // dashArray: "",
  fillOpacity: 0.8,
  // fillColor: "#006400",
};

const MapContents = ({ geoData, setDistrict, geoJsonRef }) => {
  const map = useMap();
  let selectedDistrict = null;

  const mapContext = useMapContext();

  useEffect(() => {
    map.fitBounds(geoJsonRef.current.getBounds());
    mapContext.resetZoom = () => {
      map.fitBounds(geoJsonRef.current.getBounds());
      setDistrict(null);
    };
  }, []);

  const hightlight = (e) => {
    const layer = e.target;
    layer.setStyle(HIGHLIGHT_STYLE);
    const districtNumber =
      layer.feature.properties.district || layer.feature.properties.DISTRICT;
    layer.bindTooltip(`District ${districtNumber}`).openTooltip();
  };

  const resetHighlight = (e) => {
    geoJsonRef.current.resetStyle(e.target);

    if (selectedDistrict) {
      selectedDistrict.setStyle(HIGHLIGHT_STYLE);
    }
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: hightlight,
      mouseout: resetHighlight,
      click: onClick,
    });
  };

  const styleBasedOnParty = (feature) => {
    DEFAULT_STYLE.fillColor =
      feature.properties.party === "R" ? "#E72B0D" : "#2C5282";

    return DEFAULT_STYLE;
  };

  const onClick = (e) => {
    map.fitBounds(e.target.getBounds());

    if (selectedDistrict) {
      geoJsonRef.current.resetStyle(selectedDistrict);
    }
    e.target.setStyle(HIGHLIGHT_STYLE);
    selectedDistrict = e.target;

    const districtNumber =
      e.target.feature.properties.district ||
      e.target.feature.properties.DISTRICT;
    mapContext.setSelectedDistrictNumber(districtNumber);
  };

  return (
    <>
      <GeoJSON
        key={geoData}
        ref={geoJsonRef}
        data={geoData}
        style={styleBasedOnParty}
        onEachFeature={onEachFeature}
      />
    </>
  );
};

export default MapContents;
