import React, { useContext } from "react";
import { useCallback } from "react";

// interface IMapContext {
//   resetZoom: () => void,
//   selectedDistrictNumber: number,
//   setSelectedDistrictNumber: (districtNumber: number) => void;
// }

export const MapContext = React.createContext({
  resetZoom: () => {},
  selectedDistrictNumber: 0,
  setSelectedDistrictNumber: (districtNumber) => {},
  setGeoJSON: (geoJSON) => {},
  geoJSON: null,
});

export const MapContextProvider = ({ children }) => {
  const [district, setDistrict] = React.useState(1);
  const [geoJSON, setGeoJSON] = React.useState(null);
  const geoJsonRef = React.useRef(null);

  return (
    <MapContext.Provider
      value={{
        resetZoom: null,
        setSelectedDistrictNumber: setDistrict,
        selectedDistrictNumber: district,
        setGeoJSON: setGeoJSON,
        geoJSON: geoJSON,
        geoJsonRef: geoJsonRef,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const {
    resetZoom,
    selectedDistrictNumber,
    setSelectedDistrictNumber,
    setGeoJSON,
    geoJSON,
    geoJsonRef,
  } = useContext(MapContext);

  return {
    resetZoom,
    selectedDistrictNumber,
    setSelectedDistrictNumber,
    setGeoJSON,
    geoJSON,
    geoJsonRef,
  };
};
