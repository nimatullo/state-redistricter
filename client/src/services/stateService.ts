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
    this.API = "http://localhost:8080/api";
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
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default new StateService();
