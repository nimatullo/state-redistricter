import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import ArkansasIcon from "./img/ArkansasIcon";
import FloridaIcon from "./img/FloridaIcon";
import NorthCarolinaIcon from "./img/NorthCarolinaIcon";

import FloridaJSON from "../../dummy_json/florida/data.json";
import ArkansasJSON from "../../dummy_json/arkansas/data.json";
import NorthCarolinaJSON from "../../dummy_json/north_carolina/data.json";

interface State {
  name: string;
  abrv: string;
  districts: number;
  coordinates: number[];
  population: number;
  partyBreakdown: string;
  dimensions: number[];
  json: any;
  icon: () => ReactJSXElement;
}

interface StateMap {
  [key: string]: State;
}


const OUR_STATES: StateMap = {
  ar: {
    name: "Arkansas",
    abrv: "AR",
    districts: 4,
    coordinates: [34.7464809, -92.2895948],
    population: 3.012,
    partyBreakdown: "R: 54%, D: 46%",
    dimensions: [240, 270],
    json: ArkansasJSON,
    icon: ArkansasIcon,
  },
  fl: {
    name: "Florida",
    abrv: "FL",
    districts: 27,
    coordinates: [28.5383355, -81.3792365],
    population: 21.477,
    partyBreakdown: "R: 49%, D: 51%",
    dimensions: [447, 361],
    json: FloridaJSON,
    icon: FloridaIcon,
  },
  nc: {
    name: "North Carolina",
    abrv: "NC",
    districts: 13,
    coordinates: [35.7821694, -80.793457],
    population: 10.488,
    partyBreakdown: "R: 48%, D: 52%",
    dimensions: [500, 184],
    json: NorthCarolinaJSON,
    icon: NorthCarolinaIcon,
  },
};

export default OUR_STATES;
