import percentages from "../../utils/percentages.json";
import OUR_STATES from "../assets/ourStates";

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

  async getSummaryData(state: string) {
    const stateFullName = OUR_STATES[state].fullName;
    return fetch(`${this.API}/states/${stateFullName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        const formattedData = {
          totalDistrictPlans: {
            mmd: 10000,
            smd: 10000,
          },
          avgRepSplit: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD,
              "avgRepSplits"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgRepSplits"
            ),
          },
          avgDemSplit: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD,
              "avgDemSplits"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgDemSplits"
            ),
          },
          avgOpportunityReps: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD,
              "avgOpportunityReps"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgOpportunityReps"
            ),
          },
          avgEqualPop: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD,
              "avgEqualPop"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgEqualPop"
            ),
          },
          avgPolsbyPopperScores: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD,
              "avgPolsbyPopperScores"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgPolsbyPopperScores"
            ),
          },
          layoutList: data.ensembleSummaryData.MMD.map((mmd: any) => {
            return mmd.pattern.split("chain")[1];
          }),
        };
        return formattedData;
      })
      .catch((error) => {
        throw new Error("Error fetching summary data. Is the server running?");
      });
  }

  async getLayoutList(state: string) {
    const stateFullName = OUR_STATES[state].fullName;
    return fetch(`${this.API}/states/${stateFullName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        return data.ensembleSummaryData.MMD.map((mmd: any) => {
          return mmd.pattern;
        });
      })
      .catch((error) => {
        throw new Error("Error fetching summary data. Is the server running?");
      });
  }

  async getSummaryDataForLayout(state: string, layout: string) {
    const stateFullName = OUR_STATES[state].fullName;

    return fetch(`${this.API}/states/${stateFullName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        const formattedData = {
          totalDistrictPlans: {
            mmd: 10000,
            smd: 10000,
          },
          avgRepSplit: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD.filter(
                (plan) => plan.pattern.split("chain")[1] === layout
              ),
              "avgRepSplits"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgRepSplits"
            ),
          },
          avgDemSplit: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD.filter(
                (plan) => plan.pattern.split("chain")[1] === layout
              ),
              "avgDemSplits"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgDemSplits"
            ),
          },
          avgOpportunityReps: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD.filter(
                (plan) => plan.pattern.split("chain")[1] === layout
              ),
              "avgOpportunityReps"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgOpportunityReps"
            ),
          },
          avgEqualPop: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD.filter(
                (plan) => plan.pattern.split("chain")[1] === layout
              ),
              "avgEqualPop"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgEqualPop"
            ),
          },
          avgPolsbyPopperScores: {
            mmd: this.computeAverage(
              data.ensembleSummaryData.MMD.filter(
                (plan) => plan.pattern.split("chain")[1] === layout
              ),
              "avgPolsbyPopperScores"
            ),
            smd: this.computeAverage(
              data.ensembleSummaryData.SMD,
              "avgPolsbyPopperScores"
            ),
          },
        };
        return formattedData;
      })
      .catch((error) => {
        throw new Error("Error fetching summary data. Is the server running?");
      });
  }

  computeAverage(data: any, fieldToAverage: string) {
    return (
      data.reduce((acc: number, curr: any) => {
        return acc + curr[fieldToAverage];
      }, 0) / data.length
    );
  }

  async getDistrictPlans(state: string) {
    const stateFullName = OUR_STATES[state].fullName;

    return fetch(`${this.API}/states/${stateFullName}/unique-plans-brief`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        return data.map((plan: any) => {
          return {
            id: plan.id,
            description: plan.description,
            planType: plan.planType,
          };
        });
      })
      .catch((error) => {
        throw new Error(
          "Error fetching district plans. Is the server running?"
        );
      });
  }

  async getUniqueDistrictPlan(state: string, planId: string) {
    if (!planId) return;

    const stateFullName = OUR_STATES[state].fullName;

    return fetch(`${this.API}/states/${stateFullName}/unique-plans/${planId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        const formattedData = {
          id: data.id,
          safeDistricts: data.overview.safeDistricts,
          opportunityDistricts: data.overview.opportunityDistricts,
          polsbyPopperScore: data.overview.polsbyPopperScore,
          districts: data.districts.map((district: any) => {
            return {
              districtNumber: district.id,
              totalPopulation: district.populations.reduce(
                (acc, cur) => acc + cur.count,
                0
              ),
              blackPopulation: district.populations.find(
                (pop: any) => pop.type === "BLACK"
              ).count,
              whitePopulation: district.populations.find(
                (pop: any) => pop.type === "WHITE"
              ).count,
              asianPopulation: district.populations.find(
                (pop: any) => pop.type === "ASIAN"
              ).count,
              hispanicPopulation: district.populations.find(
                (pop: any) => pop.type === "HISPANIC"
              ).count,
              demSplit: (district.demSplit * 100).toFixed(2) + "%",
              repSplit: (district.repSplit * 100).toFixed(2) + "%",
            };
          }),
        };
        console.log(formattedData);
        return formattedData;
      })
      .catch((error) => {
        throw new Error(
          "Error fetching district plans. Is the server running?"
        );
      });
  }

  async getSharePercentages(state: string) {
    const fullStateName = OUR_STATES[state].fullName;
    return fetch(`${this.API}/states/${fullStateName}/analysis`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        const formattedData = {
          SMD: data.SMD[0].voteSeatSharePercentages,
          MMD: {
            DEMOCRAT: data.MMD.reduce(
              (acc: any, curr: any) => {
                return [
                  acc[0] + curr.voteSeatSharePercentages.DEMOCRAT[0],
                  acc[1] + curr.voteSeatSharePercentages.DEMOCRAT[1],
                ];
              },
              [0, 0]
            ).map((val: number) => {
              return val / data.MMD.length;
            }),
            REPUBLICAN: data.MMD.reduce(
              (acc: any, curr: any) => {
                return [
                  acc[0] + curr.voteSeatSharePercentages.REPUBLICAN[0],
                  acc[1] + curr.voteSeatSharePercentages.REPUBLICAN[1],
                ];
              },
              [0, 0]
            ).map((val: number) => {
              return val / data.MMD.length;
            }),
          },
        };
        console.log(formattedData);
        return formattedData;
      })
      .catch((error) => {
        throw new Error(
          "Error fetching district plans. Is the server running?"
        );
      });
  }

  async getGraphData(state: string, type: string, planType: string) {
    const stateFullName = OUR_STATES[state].fullName;
    return fetch(
      `${this.API}/states/${stateFullName}/${planType}/analysis/${type}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        switch (type) {
          case "opp-reps":
            return this._handleOppRepCall(data);
          case "rep-dem-split":
            return this._handleRepDemSplitCall(data);
          default:
            console.log("Error: invalid type");
        }
      })
      .catch((error) => {
        throw new Error("Error fetching graph data. Is the server running?");
      });
  }

  _handleRepDemSplitCall = (data) => {
    console.log(data);
    const graphData = {
      graph: {
        labels: Array(data.length)
          .fill(0)
          .map((_, i) => `${i}D/${data.length - i}R`),
        datasets: [
          {
            label: "Republican/Democrat Split",
            data: data,
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
            text: "Republican/Democrat Split",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "R/D",
            },
            ticks: {
              min: 3,
            },
          },
          y: {
            title: {
              display: true,
              text: "split type count",
            },
          },
        },
      },
    };
    return graphData;
  };

  _handleOppRepCall = (data) => {
    const graphData = {
      graph: {
        labels: Array(data.length)
          .fill(0)
          .map((_, i) => i + 1),
        datasets: [
          {
            label: "Opportunity Representative Count",
            data: data,
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
            text: "Opportunity Representative Count by District",
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
              text: "count of opportunity representatives",
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    };
    return graphData;
  };

  async getBoxAndWhiskerData(
    state: string,
    population: string,
    planType: string
  ) {
    const stateFullName = OUR_STATES[state].fullName;
    let pattern = "none";

    if (planType != "SMD") {
      pattern = planType;
      planType = "MMD";
    }

    return fetch(
      `${this.API}/states/${stateFullName}/${planType}/${pattern}/analysis/box-whisker/${population}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        const listData = Object.values(data);
        const graphData = {
          graph: {
            labels: listData.map((_, i) => i + 1),
            datasets: [
              {
                label: population,
                itemRadius: 2,
                // Sort the list by increasing mean value which is the 4th element in the list
                data: listData
                  .map((d: any) => Object.values(d))
                  .sort((a, b) => {
                    return a[4] - b[4];
                  }),
                backgroundColor: "#3e95cd",
                borderColor: "#3e95cd",
              },
            ],
          },
          options: {
            quantiles: "fivenum",
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: `${
                  population[0].toLocaleUpperCase() +
                  population.slice(1, population.length).toLocaleLowerCase()
                } Box and Whisker Plot`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Indexed Districts",
                },
                ticks: {
                  min: 3,
                },
              },
              y: {
                title: {
                  display: true,
                  text: population,
                },
              },
            },
          },
        };
        console.log(graphData);
        return graphData;
      });
  }

  async getUniquePlanGeoJSON(
    state: string,
    planType: string,
    description: string
  ) {
    const stateFullName = OUR_STATES[state].fullName;
    return fetch(
      `${this.API}/states/${stateFullName}/unique-plans/geojson/${planType}/${description}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        return data;
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
