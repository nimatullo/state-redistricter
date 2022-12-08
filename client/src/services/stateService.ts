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
    // Get the API URL from the current URL
    const url = new URL(window.location.href);
    this.API = `${url.protocol}//${url.hostname}:8080/api`;
    console.log(this.API);
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

  getSummaryData(state: string, layout?: string) {
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
      districtData: Array(30)
        .fill(0)
        .map((_, i) => {
          return {
            districtId: i + 1,
            population: randomNumber(100000, 200000),
            africanAmerican: randomNumber(2000, 10000),
            hispanic: randomNumber(2000, 10000),
            asian: randomNumber(2000, 10000),
            white: randomNumber(2000, 10000),
            republican: randomNumber(0, 100),
            democrat: randomNumber(0, 100),
            opportunityDistricts: randomNumber(0, 30),
            safeDistricts: randomNumber(0, 30),
            polsbyPopper: randomNumber(0, 100) / 100,
          };
        }),
    };
  }

  getGraphData(state: string, type: string) {
    const totalDistricts = randomNumber(5, 27);

    const graphInfo = {
      "Republican/Democratic Split": {
        data: {
          labels: Array(27)
            .fill(0)
            .map((_, i) => `${i + 1}D/${27 - (i + 1)}R`),
          datasets: [
            {
              label: "Districts with Democrat Winner",
              data: Array(27)
                .fill(0)
                .map(() => Math.round(Math.random() * 100)),
              backgroundColor: "#3e95cd",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Number of times a split occurs within an ensemble",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "dem/rep",
              },
            },
            y: {
              title: {
                display: true,
                text: "occurrences",
              },
            },
          },
        },
      },
      "Opportunity Representatives": {
        data: {
          labels: Array(3)
            .fill(0)
            .map((_, i) => 3 + i),
          datasets: [
            {
              label: "Opportunity Representatives",
              data: Array(3)
                .fill(0)
                .map(() => randomNumber(1, 10000)),
              backgroundColor: "#3e95cd",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Opportunity Representatives",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "district",
              },
              ticks: {
                min: 3,
              },
            },
            y: {
              title: {
                display: true,
                text: "opportunity representatives",
              },
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      },
    };

    if (!graphInfo[type]) return null;

    return graphInfo[type];
  }

  getBoxAndWhiskerData(state: string, population: string) {
    const data = {
      labels: Array.from({ length: 27 }, (_, i) => i + 1),
      datasets: [
        {
          label: population,
          itemRadius: 2,
          data: Array.from({ length: 27 }, () =>
            Array.from({ length: 5 }, () => randomNumber(0, 100))
          ),
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
        },
      ],
    };
    return data;
  }

  async getUniquePlanGeoJSON() {
    return fetch(`${this.API}/states/deez`)
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
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default new StateService();
