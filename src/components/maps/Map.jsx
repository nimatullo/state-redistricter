// Base
import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Box, Text, Spinner, Button, Switch, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

// Custom
import DistrictsService from "../../services/districtsService";
import InfoBox from "../InfoBox";
import MapContents from "./MapContents";
import "../../assets/styles/map.css";

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
  const [stateCoordinates, setCoordinates] = useState(null);

  const params = useParams();

  useEffect(() => {
    const stateFromDict = OUR_STATES.find(
      (state) => state.abrv.toLowerCase() === params.state.toLowerCase()
    );
    setCoordinates(stateFromDict.coordinates);
    getData(stateFromDict);
  }, []);

  const getData = async (state) => {
    let geojson = [];
    const stateDistricts = await DistrictsService.getGeoJSONForState(
      state.abrv,
      state.districts
    );
    geojson = geojson.concat(stateDistricts);
    setGeoData(geojson);
  };

  return (
    geoData && (
      <div className="map">
        <MapContainer
          style={{
            height: "100%",
            width: "50%",
          }}
          center={stateCoordinates}
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
              <MapContents
                geoData={geoData}
                setDistrict={setSelectedDistrict}
              />
            </>
          )}
        </MapContainer>
        <InfoBox district={selectedDistrict} />
        <HStack
          bg="blue.500"
          color={"white"}
          className="multi-member-view"
          shadow={"md"}
          borderRadius={"md"}
          padding={"1rem"}
        >
          <Text>Switch to MMD view</Text>
          <Switch colorScheme="green" />
        </HStack>
      </div>
    )
  );
};

export default Map;
