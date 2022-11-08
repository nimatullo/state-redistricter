import { React, useContext, useEffect, useRef } from "react";
import { useMap, GeoJSON } from "react-leaflet";
import MapContext from "../../services/mapContext";

const DEFAULT_STYLE = {
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

const MapContents = ({ geoData, setDistrict, geoJsonRef, district }) => {
  const map = useMap();
  let selectedDistrict = null;

  const mapContext = useContext(MapContext);

  useEffect(() => {
    mapContext.resetZoom = () => {
      map.fitBounds(geoJsonRef.current.getBounds());
      setDistrict(null);
    };
  }, []);

  useEffect(() => {
    if (district) {
      const dist = geoJsonRef.current
        .getLayers()
        .find((layer) => layer.feature.properties.name === district);

      map.fitBounds(dist.getBounds());
    }
  }, [district]);

  const hightlight = (e) => {
    const layer = e.target;
    layer.setStyle(HIGHLIGHT_STYLE);
    const districtNumber = layer.feature.properties.name.split("-")[1];
    layer.bindTooltip(`District ${districtNumber}`).openTooltip();
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

  const styleBasedOnParty = (feature) => {
    DEFAULT_STYLE.fillColor = Math.random() < 0.5 ? "#E53E3E" : "#2C5282";

    return DEFAULT_STYLE;
  };

  const onClick = (e) => {
    map.fitBounds(e.target.getBounds());

    if (selectedDistrict) {
      console.log("selectedDistrict", selectedDistrict);
      geoJsonRef.current.resetStyle(selectedDistrict);
    }
    e.target.setStyle({
      fillColor: "#2C5282",
    });
    selectedDistrict = e.target;
    setDistrict(e.target.feature.properties.name);
  };

  return (
    <>
      <GeoJSON
        ref={geoJsonRef}
        data={geoData}
        style={styleBasedOnParty}
        onEachFeature={onEachFeature}
      />
    </>
  );
};

export default MapContents;
