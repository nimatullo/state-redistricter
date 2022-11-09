import percentages from "../../utils/percentages.json";

interface District {
  type: string;
  id: number;
  properties: {
    name: string;
  };
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

class StateService {
  API: string;

  constructor() {
    this.API = "http://192.168.1.243:8080/api";
  }

  async getGeoJSONForState(state: string): Promise<District[]> {
    return fetch(`${this.API}/states/${state}/shape`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        throw new Error("Error fetching geojson. Is the server running?");
      });
  }

  getStateData(state: string) {
    return percentages.find(
      (stateData) => stateData.state.toLowerCase() === state.toLowerCase()
    );
  }

  getSummaryData(state: string) {
    return {
      numberOfDistricts: {
        mmd: randomNumber(3, 18),
        smd: randomNumber(3, 18),
      },
      majorityMinority: {
        mmd: randomNumber(0, 100),
        smd: randomNumber(0, 100),
      },
      equalPopMeasure: {
        mmd: randomNumber(0, 100),
        smd: randomNumber(0, 100),
      },
      polsbyPopper: {
        mmd: randomNumber(0, 100),
        smd: randomNumber(0, 100),
      },
      republicanDemocraticSplit: {
        mmd: randomNumber(0, 100),
        smd: randomNumber(0, 100),
      },
    };
  }

  getDistrictPlans(state: string) {
    return [
      {
        id: 1,
        quality: "High Republican Concentration",
      },
      {
        id: 2,
        quality: "Low African American Representation",
      },
    ];
  }

  getUniqueDistrictPlan(planId: string) {
    return {
      id: 1,
      quality: "High Republican Concentration",
      districtData: [
        {
          districtId: 1,
          population: randomNumber(100000, 1000000),
          africanAmerican: randomNumber(2000, 100000),
          republican: 54,
          democrat: 46,
          opportunityDistricts: randomNumber(0, 15),
          safeDistricts: randomNumber(0, 20),
          polsbyPopper: randomNumber(0, 100),
        },
        {
          districtId: 2,
          population: 100,
          africanAmerican: 10,
          republican: 80,
          democrat: 20,
          opportunityDistricts: randomNumber(0, 15),
          safeDistricts: randomNumber(0, 20),
          polsbyPopper: randomNumber(0, 100),
        },
        {
          districtId: 3,
          population: 100,
          africanAmerican: 10,
          republican: 80,
          democrat: 20,
          opportunityDistricts: randomNumber(0, 15),
          safeDistricts: randomNumber(0, 20),
          polsbyPopper: randomNumber(0, 100),
        },
      ],
    };
  }
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default new StateService();
