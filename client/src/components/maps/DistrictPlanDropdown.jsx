import React, { useState } from "react";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import stateService from "../../services/stateService";

const DistrictPlanDropdown = (props) => {
  const navigate = useNavigate();
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
      }}
    >
      {interestingDistricts.map((district) => (
        <option value={district.id}>{`${district.quality}`}</option>
      ))}
    </Select>
  );
};

export default DistrictPlanDropdown;
