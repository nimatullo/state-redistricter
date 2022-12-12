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
    name: "Graphical Analysis",
    icon: BsGraphUp,
    children: [
      {
        name: "Summary",
        view: "graphical-summary",
      },
      {
        name: "Box & Whisker",
        view: "box-whisker",
      },
      {
        name: "Opportunity Representative Threshold",
        view: "opp-rep",
      },
    ],
  },
];
