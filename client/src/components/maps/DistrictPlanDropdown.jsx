import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import stateService from "../../services/stateService";
import { useMapContext } from "../../services/mapContext";

const DistrictPlanDropdown = (props) => {
  const params = useParams();

  const mapContext = useMapContext();
  const [interestingDistricts, setInterestingDistricts] = useState([]);

  useEffect(() => {
    stateService.getDistrictPlans(params.state).then((data) => {
      setInterestingDistricts(data);
    });
  }, []);
  return (
    <Select
      variant="outline"
      placeholder={"Select a district plan"}
      onChange={(e) => {
        props.setSelectedPlan(e.target.value);
        // stateService.getUniquePlanGeoJSON().then((data) => {
        //   if (mapContext.geoJsonRef.current) {
        //     mapContext.geoJsonRef.current.clearLayers().addData(data);
        //     mapContext.setGeoJSON(data);
        //   }
        // });
      }}
    >
      <optgroup label="SMD Unique Plans">
        {interestingDistricts
          .filter((plan) => plan.planType === "SMD")
          .map((plan) => (
            <option value={plan.id}>{plan.description}</option>
          ))}
      </optgroup>
      <optgroup label="MMD Unique Plans">
        {interestingDistricts
          .filter((plan) => plan.planType === "MMD")
          .map((plan) => (
            <option value={plan.id}>{plan.description}</option>
          ))}
      </optgroup>
    </Select>
  );
};

export default DistrictPlanDropdown;
