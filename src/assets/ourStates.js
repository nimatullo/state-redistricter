import ArkansasIcon from "./img/ArkansasIcon";
import FloridaIcon from "./img/FloridaIcon";
import NorthCarolinaIcon from "./img/NorthCarolinaIcon";

const OUR_STATES = {
  ar: {
    name: "Arkansas",
    abrv: "AR",
    districts: 4,
    coordinates: [34.7464809, -92.2895948],
    population: 3.012,
    partyBreakdown: "R: 54%, D: 46%",
    districtType: "Single-Member",
    icon: ArkansasIcon,
  },
  fl: {
    name: "Florida",
    abrv: "FL",
    districts: 27,
    coordinates: [28.5383355, -81.3792365],
    population: 21.477,
    partyBreakdown: "R: 49%, D: 51%",
    districtType: "Single-Member",
    icon: FloridaIcon,
  },
  nc: {
    name: "North Carolina",
    abrv: "NC",
    districts: 13,
    coordinates: [35.7821694, -80.793457],
    population: 10.488,
    partyBreakdown: "R: 48%, D: 52%",
    districtType: "Single-Member",
    icon: NorthCarolinaIcon,
  },
};

export default OUR_STATES;
