// Base
import { React, useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Text, Spinner, Switch, HStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

// Custom
import DistrictsService from "../../services/districtsService";
import InfoBox from "../InfoBox";
import MapContents from "./MapContents";
import "../../assets/styles/map.css";

import OUR_STATES from "../../assets/ourStates";
import { MapProvider } from "../../services/mapContext";

const Map = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [geoData, setGeoData] = useState();
  const [loading, setLoading] = useState(true);
  const [stateCoordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(7);

  const params = useParams();

  useEffect(() => {
    const stateFromDict = OUR_STATES[params.state];
    setCoordinates(stateFromDict.coordinates);
    getData(stateFromDict);
  }, []);

  const getData = async (state) => {
    const stateDistricts = await DistrictsService.getGeoJSONForState(
      state.name
    );
    setGeoData(stateDistricts);
  };

  return (
    geoData && (
      <div className="map">
        <MapProvider
          value={{
            resetZoom: null,
          }}
        >
          <MapContainer
            style={{
              height: "100%",
              width: "100%",
            }}
            center={stateCoordinates}
            zoom={zoom}
            minZoom={7}
            loadingControl={true}
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
          {/* <InfoBox district={selectedDistrict} /> */}
        </MapProvider>
      </div>
    )
  );
};

export default Map;
