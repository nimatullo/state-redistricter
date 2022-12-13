import percentages from "../../utils/percentages.json";
import OUR_STATES from "../assets/ourStates";
import oppRepData from "../assets/threshold.json";
import elections from "../assets/electionResults.json";
import evenUneven from "../assets/even-uneven-election.json";

import { faker } from "@faker-js/faker";

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
        console.log(data);
        const formattedData = {
          id: data.id,
          safeDistricts: data.overview.safeDistricts,
          opportunityDistricts: data.overview.opportunityDistricts,
          polsbyPopperScore: data.overview.polsbyPopperScore,
          planType: data.planType,
          districts: data.districts.map((district: any, index: number) => {
            return {
              districtNumber: district.id,
              opportunityDistrictThreshold:
                data.planType === "MMD"
                  ? 1 /
                    Number(data.description.split("chain")[1].split("")[index])
                  : 0.5,
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
        return data;
      })
      .catch((error) => {
        throw new Error("Error fetching geojson. Is the server running?");
      });
  }

  async getOppRepGraph(state: string) {
    const data = oppRepData[state];

    const graphData = {
      graph: {
        labels: Object.keys(data.smd)
          .map((d) => Number(d).toFixed(2))
          .sort((a, b) => {
            return Number(b) - Number(a);
          }),
        datasets: [
          {
            label: "Opportunity Representative Count For SMD",
            data: Object.keys(data.smd)
              .sort((a, b) => {
                return Number(b) - Number(a);
              })
              .map((d) => data.smd[d]),
            backgroundColor: "#3e95cd",
          },
          {
            label: "Opportunity Representative Count For MMD",
            data: Object.keys(data.mmd)
              .sort((a, b) => {
                return Number(b) - Number(a);
              })
              .map((d) => data.mmd[d]),
            backgroundColor: "#8e5ea2",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
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
              text: "threshold",
            },
            autoSkip: true,
            ticks: {
              max: 1,
              stepSize: 0.2,
            },
          },
          y: {
            title: {
              display: true,
              text: "count of opportunity representatives",
            },
          },
        },
      },
    };
    return graphData;
  }

  async getCandidates(state: string, fetchInfo: string) {
    const electionData = elections[state];

    const winners = Object.keys(electionData).map((key) => {
      return electionData[key].Winners.map((winner) => {
        return {
          name: winner[0],
          party: winner[1],
          district: Number(key),
          totalVotes: winner[2],
          isWinner: true,
        };
      });
    });

    const losers = Object.keys(electionData).map((key) => {
      return electionData[key].Eliminated.map((loser) => {
        return {
          name: loser[0],
          party: loser[1],
          district: Number(key),
          totalVotes: loser[2],
          isWinner: false,
          threshold: electionData[key].VoteThreshold,
        };
      });
    });

    if (fetchInfo === "winners") {
      return winners.sort((a, b) => {
        return a.district - b.district;
      });
    } else if (fetchInfo === "losers") {
      return losers.sort((a, b) => {
        return a.district - b.district;
      });
    } else {
      return winners
        .concat(losers)
        .flatMap((w) => w)
        .sort((a, b) => {
          return a.district - b.district;
        });
    }

    console.log(winners);
    return winners;
    // return Array(20)
    //   .fill(0)
    //   .map((_, i) => {
    //     return {
    //       name: faker.name.fullName(),
    //       party: Math.random() > 0.5 ? "Democrat" : "Republican",
    //       district: randomNumber(1, 13),
    //       totalVotes: Number(faker.random.numeric(5)).toLocaleString(),
    //       isWinner: Math.random() > 0.5,
    //     };
    //   })
    //   .sort((a, b) => {
    //     return a.district - b.district;
    //   });
  }

  async getCandidateWinners(state: string) {
    return Array(13)
      .fill(0)
      .map((_, i) => {
        return {
          name: faker.name.fullName(),
          party: Math.random() > 0.5 ? "Democrat" : "Republican",
          district: randomNumber(1, 13),
          totalVotes: Number(faker.random.numeric(5)).toLocaleString(),
          isWinner: Math.random() > 0.5,
        };
      })
      .sort((a, b) => {
        return a.district - b.district;
      });
  }

  async getCandidateLosers(state: string) {
    // Get the winners first then get the losers
    // This is so that we can include who the losers lost to
    const winners = await this.getCandidateWinners(state);

    return Array(10)
      .fill(0)
      .map((_, i) => {
        return {
          name: faker.name.fullName(),
          party: Math.random() > 0.5 ? "Democrat" : "Republican",
          district: randomNumber(1, 13),
          totalVotes: Number(faker.random.numeric(5)).toLocaleString(),
          isWinner: Math.random() > 0.5,
          lostTo: winners[randomNumber(0, winners.length - 1)].name,
        };
      })
      .sort((a, b) => {
        return a.district - b.district;
      });
  }

  async getCandidatesForComparison(fetchInfo: string) {
    const even = evenUneven["even"];
    const uneven = evenUneven["uneven"];

    let winners = Object.keys(even).map((key) => {
      return even[key].Winners.map((winner) => {
        return {
          name: winner[0],
          party: winner[1],
          district: Number(key),
          totalVotes: winner[2],
          isWinner: true,
          type: "even",
        };
      });
    });

    winners = winners.concat(
      Object.keys(uneven).map((key) => {
        return uneven[key].Winners.map((winner) => {
          return {
            name: winner[0],
            party: winner[1],
            district: Number(key),
            totalVotes: winner[2],
            isWinner: true,
            type: "uneven",
          };
        });
      })
    );

    let losers = Object.keys(even).map((key) => {
      return even[key].Eliminated.map((loser) => {
        return {
          name: loser[0],
          party: loser[1],
          district: Number(key),
          totalVotes: loser[2],
          isWinner: false,
          threshold: even[key].VoteThreshold,
          type: "even",
        };
      });
    });

    losers = losers.concat(
      Object.keys(uneven).map((key) => {
        return uneven[key].Eliminated.map((loser) => {
          return {
            name: loser[0],
            party: loser[1],
            district: Number(key),
            totalVotes: loser[2],
            isWinner: false,
            threshold: uneven[key].VoteThreshold,
            type: "uneven",
          };
        });
      })
    );

    if (fetchInfo === "winners") {
      return winners
        .flatMap((w) => w)
        .sort((a, b) => {
          return a.district - b.district;
        });
    } else if (fetchInfo === "losers") {
      return losers
        .flatMap((w) => w)
        .sort((a, b) => {
          return a.district - b.district;
        });
    } else {
      return winners
        .concat(losers)
        .flatMap((w) => w)
        .sort((a, b) => {
          return a.district - b.district;
        });
    }
  }
}

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default new StateService();
