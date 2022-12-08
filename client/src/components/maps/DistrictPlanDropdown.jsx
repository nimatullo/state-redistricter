import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import stateService from "../../services/stateService";
import { useMapContext } from "../../services/mapContext";

const DistrictPlanDropdown = (props) => {
  const mapContext = useMapContext();
  const [interestingDistricts, setInterestingDistricts] = useState([]);

  useEffect(() => {
    setInterestingDistricts(stateService.getDistrictPlans(""));
  }, []);
  return (
    <Select
      variant="outline"
      placeholder={"Select a district plan"}
      onChange={(e) => {
        props.setSelectedPlan(e.target.value);
        stateService.getUniquePlanGeoJSON().then((data) => {
          if (mapContext.geoJsonRef.current) {
            mapContext.geoJsonRef.current.clearLayers().addData(data);
            mapContext.setGeoJSON(data);
          }
        });
      }}
    >
      {interestingDistricts.map((district) => (
        <option value={district.id}>{`${district.quality}`}</option>
      ))}
    </Select>
  );
};

export default DistrictPlanDropdown;
