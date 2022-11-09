import { BiBookOpen } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { FaBalanceScale, FaMoneyBillWaveAlt } from "react-icons/fa";
import { BsFillPersonFill, BsGraphUp } from "react-icons/bs";
import { IconType } from "react-icons/lib";

interface ChildSidebarLink {
  name: string;
  view: string;
}

interface SidebarLink {
  name: string;
  icon: IconType;
  view?: string;
  children?: ChildSidebarLink[];
}

export const sidebarLinks: SidebarLink[] = [
  {
    name: "Overview",
    icon: BiBookOpen,
    view: "overview",
  },
  {
    name: "Unique Plans",
    icon: AiOutlineStar,
    view: "unique",
  },
  {
    name: "Analysis",
    icon: BsGraphUp,
    children: [
      {
        name: "Voter Prediction",
        view: "voter-prediction",
      },
      {
        name: "Box & Whisker",
        view: "box-whisker",
      },
    ],
  },
  {
    name: "Fairness",
    icon: FaBalanceScale,
    children: [
      {
        name: "Partisan Fairness",
        view: "partisan-fairness",
      },
      {
        name: "Racial Fairness",
        view: "racial-fairness",
      },
    ],
  },
  {
    name: "Race Information",
    icon: BsFillPersonFill,
    children: [
      {
        name: "African American",
        view: "af-population",
      },
      {
        name: "Asian",
        view: "asian-population",
      },
      {
        name: "Hispanic",
        view: "hispanic-population",
      },
      {
        name: "White",
        view: "white-population",
      },
    ],
  },
  {
    name: "Socioeconomic Information",
    icon: FaMoneyBillWaveAlt,
    children: [
      {
        name: "African American",
        view: "af-socioeconomic",
      },
      {
        name: "Asian",
        view: "asian-socioeconomic",
      },
      {
        name: "Hispanic",
        view: "hispanic-socioeconomic",
      },
      {
        name: "White",
        view: "white-soceoeconomic",
      },
    ],
  },
];
