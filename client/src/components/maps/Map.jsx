// Base
import { React, useState, useEffect, useRef, useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Select, Spinner } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

// Custom
import StateService from "../../services/stateService";
import MapContents from "./MapContents";
import "../../assets/styles/map.css";

import OUR_STATES from "../../assets/ourStates";
import { useAlert } from "../../services/alertservice";
import DistrictPlanDropdown from "./DistrictPlanDropdown";
import { useMapContext } from "../../services/mapContext";

const Map = () => {
  const [geoData, setGeoData] = useState();
  const [loading, setLoading] = useState(true);
  const [stateCoordinates, setCoordinates] = useState(null);
  const [zoom, setZoom] = useState(6);

  const geoJsonRef = useRef(null);
  const params = useParams();
  const { setMessage } = useAlert();
  const mapContext = useMapContext();

  useEffect(() => {
    const stateFromDict = OUR_STATES[params.state];
    setCoordinates(stateFromDict.coordinates);
    getData(stateFromDict);
  }, []);

  const getData = async (state) => {
    StateService.getGeoJSONForState(state.fullName)
      .then((data) => {
        mapContext.setGeoJSON(data);
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
    mapContext.geoJSON && (
      <div className="map">
        <MapContainer
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
          center={stateCoordinates}
          zoom={zoom}
          minZoom={6}
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
                geoJsonRef={mapContext.geoJsonRef}
                geoData={mapContext.geoJSON}
              />
            </>
          )}
        </MapContainer>
      </div>
    )
  );
};

export default Map;
