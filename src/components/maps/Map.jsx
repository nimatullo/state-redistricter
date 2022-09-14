import { React, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import DistrictsService from "../../services/districtsService";

import InfoBox from "../InfoBox";

import "../../assets/styles/map.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  HStack,
  Spinner,
} from "@chakra-ui/react";

const OUR_STATES = [
  {
    abrv: "FL",
    districts: 27,
    coordinates: [28.5383355, -81.3792365],
  },
  {
    abrv: "NC",
    districts: 13,
    coordinates: [35.7595731, -79.0192997],
  },
  {
    abrv: "AR",
    districts: 4,
    coordinates: [34.7464809, -92.2895948],
  },
];

const Map = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [geoData, setGeoData] = useState();
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const [state, setState] = useState(null);

  const geoJsonRef = useRef();

  useEffect(() => {
    getData();
    setState(
      OUR_STATES.find((s) => s.abrv.toLocaleLowerCase() === params.state)
    );
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

  const highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      color: "#3182CE",
      dashArray: "",
      fillOpacity: 0.5,
      fillColor: "#63B3ED",
    });
  };

  const resetHighlight = (e) => {
    geoJsonRef.current.resetStyle(e.target);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: () => onDistrictClick(feature),
    });
  };

  const onDistrictClick = (feature) => {
    setSelectedDistrict(feature.properties.name);
  };

  const style = (feature) => {
    const mapStyle = {
      fillColor: "#bcbcbc",
      weight: 3,
      opacity: 1,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.5,
    };

    if (selectedDistrict === feature.properties.name) {
      mapStyle.fillColor = "#3182CE";
      mapStyle.fillOpacity = 0.5;
    }

    return mapStyle;
  };

  return (
    geoData && (
      <div className="map">
        <Stack direction={"row"}>
          <MapContainer
            center={state.coordinates}
            zoom={7}
            scrollWheelZoom={true}
            whenReady={() => {
              setLoading(false);
            }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
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
              </>
            )}
          </MapContainer>
          <InfoBox district={selectedDistrict} />
        </Stack>
      </div>
    )
  );
};

export default Map;
