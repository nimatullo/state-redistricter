// Base
import { React, useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Select, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

// Custom
import StateService from "../../services/stateService";
import MapContents from "./MapContents";
import "../../assets/styles/map.css";

import OUR_STATES from "../../assets/ourStates";
import { MapProvider } from "../../services/mapContext";
import { useAlert } from "../../services/alertservice";
import stateService from "../../services/stateService";

const Map = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [geoData, setGeoData] = useState();
  const [loading, setLoading] = useState(true);
  const [stateCoordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(7);

  const geoJsonRef = useRef();

  const [interestingDistricts, setInterestingDistricts] = useState([]);

  const params = useParams();
  const { setMessage } = useAlert();

  useEffect(() => {
    const stateFromDict = OUR_STATES[params.state];
    setCoordinates(stateFromDict.coordinates);
    getData(stateFromDict);

    setInterestingDistricts(stateService.getDistrictPlans(""));
  }, []);

  const getData = async (state) => {
    StateService.getGeoJSONForState(state.fullName)
      .then((data) => {
        setGeoData(data);
      })
      .catch((err) => {
        setMessage({
          type: "error",
          data: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
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
                  geoJsonRef={geoJsonRef}
                  geoData={geoData}
                  district={selectedDistrict}
                  setDistrict={setSelectedDistrict}
                />
              </>
            )}
          </MapContainer>
          <div className="multi-member-view">
            <Select
              size="lg"
              variant="filled outline"
              shadow={"md"}
              placeholder={"Select a district"}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedDistrict(e.target.value);
              }}
            >
              {interestingDistricts.map((district) => (
                <option value={`FL-${district.district}`}>
                  {district.quality}
                </option>
              ))}
            </Select>
          </div>
        </MapProvider>
      </div>
    )
  );
};

export default Map;
