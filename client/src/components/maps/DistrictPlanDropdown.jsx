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
  const [interestingDistrictMap, setInterestingDistrictMap] = useState({});

  useEffect(() => {
    stateService.getDistrictPlans(params.state).then((data) => {
      data.forEach((plan) => {
        interestingDistrictMap[plan.id] = plan;
      });
      setInterestingDistricts(data);
    });
  }, []);
  return (
    <Select
      variant="outline"
      placeholder={"Select a district plan"}
      onChange={(e) => {
        console.log(interestingDistrictMap);
        const planId = e.target.value;
        props.setSelectedPlan(planId);

        stateService
          .getUniquePlanGeoJSON(
            params.state,
            interestingDistrictMap[planId].planType,
            interestingDistrictMap[planId].description
          )
          .then((data) => {
            if (mapContext.geoJsonRef.current) {
              mapContext.geoJsonRef.current.clearLayers().addData(data);
              mapContext.setGeoJSON(data);
              mapContext.setSelectedDistrictNumber(1);
            }
          });
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
