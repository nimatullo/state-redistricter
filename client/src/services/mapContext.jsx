import React, { useContext } from "react";

// interface IMapContext {
//   resetZoom: () => void,
//   selectedDistrictNumber: number,
//   setSelectedDistrictNumber: (districtNumber: number) => void;
// }

export const MapContext = React.createContext({
  resetZoom: () => {},
  selectedDistrictNumber: 0,
  setSelectedDistrictNumber: (districtNumber) => {},
});

export const MapContextProvider = ({ children }) => {
  const [district, setDistrict] = React.useState(1);

  return (
    <MapContext.Provider
      value={{
        resetZoom: null,
        setSelectedDistrictNumber: setDistrict,
        selectedDistrictNumber: district,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const { resetZoom, selectedDistrictNumber, setSelectedDistrictNumber } =
    useContext(MapContext);

  return {
    resetZoom,
    selectedDistrictNumber,
    setSelectedDistrictNumber,
  };
};
