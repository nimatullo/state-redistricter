import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import UtahIcon from "./img/UtahIcon";
import VirginiaIcon from "./img/VirginiaIcon";
import NorthCarolinaIcon from "./img/NorthCarolinaIcon";

interface State {
  fullName: string;
  abrv: string;
  districts: number;
  coordinates: number[];
  population: number;
  partyBreakdown: string;
  dimensions: number[];
  icon: () => ReactJSXElement;
}

interface StateMap {
  [key: string]: State;
}

const OUR_STATES: StateMap = {
  ut: {
    fullName: "Utah",
    abrv: "UT",
    districts: 4,
    coordinates: [39.321, -111.0937],
    population: 3.338,
    partyBreakdown: "R: 54%, D: 46%",
    dimensions: [240, 270],
    icon: UtahIcon,
  },
  va: {
    fullName: "Virginia",
    abrv: "VA",
    districts: 11,
    coordinates: [37.9269, -78.0249],
    population: 21.477,
    partyBreakdown: "R: 49%, D: 51%",
    dimensions: [447, 361],
    icon: VirginiaIcon,
  },
  nc: {
    fullName: "North Carolina",
    abrv: "NC",
    districts: 13,
    coordinates: [35.7821694, -80.793457],
    population: 10.488,
    partyBreakdown: "R: 48%, D: 52%",
    dimensions: [500, 184],
    icon: NorthCarolinaIcon,
  },
};

export default OUR_STATES;
