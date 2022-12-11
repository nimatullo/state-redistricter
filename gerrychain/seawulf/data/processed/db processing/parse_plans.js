let plans = {
  "high vote seat share skew": {
    blk_pop: {
      1: 342228,
      2: 659507,
      3: 438807,
      4: 579312,
    },
    asn_pop: {
      1: 46004,
      2: 41934,
      3: 52883,
      4: 65758,
    },
    hsp_pop: {
      1: 171601,
      2: 205961,
      3: 204579,
      4: 217979,
    },
    wt_pop: {
      1: 1593936,
      2: 1839959,
      3: 1485829,
      4: 1304271,
    },
    tot_pop: {
      1: 2206159,
      2: 2878044,
      3: 2226600,
      4: 2224680,
    },
    minority_pop: {
      1: 559833,
      2: 907402,
      3: 696269,
      4: 863049,
    },
    dem_split: {
      0: 0.530640060606162,
      1: 0.444033705197889,
      2: 0.48738007776627135,
      3: 0.5605655902373102,
    },
    rep_split: {
      0: 0.469359939393838,
      1: 0.555966294802111,
      2: 0.5126199222337287,
      3: 0.4394344097626897,
    },
    safe_districts: 0,
    opportunity_reps: 0,
    polsby_popper_scores: {
      1: 0.18085551414417309,
      2: 0.15439140898256265,
      3: 0.15194762002965997,
      4: 0.13189771984698714,
    },
  },
  "democrat split > .6": {
    blk_pop: {
      1: 361319,
      2: 769152,
      3: 369452,
      4: 519931,
    },
    asn_pop: {
      1: 55235,
      2: 32092,
      3: 42717,
      4: 76535,
    },
    hsp_pop: {
      1: 178585,
      2: 222545,
      3: 184383,
      4: 214607,
    },
    wt_pop: {
      1: 1560148,
      2: 1787132,
      3: 1583484,
      4: 1293231,
    },
    tot_pop: {
      1: 2209474,
      2: 2945362,
      3: 2222364,
      4: 2158283,
    },
    minority_pop: {
      1: 595139,
      2: 1023789,
      3: 596552,
      4: 811073,
    },
    dem_split: {
      0: 0.5471976425515486,
      1: 0.4355712629399041,
      2: 0.43462479325342535,
      3: 0.6014436299547603,
    },
    rep_split: {
      0: 0.45280235744845143,
      1: 0.5644287370600959,
      2: 0.5653752067465746,
      3: 0.39855637004523975,
    },
    safe_districts: 0,
    opportunity_reps: 0,
    polsby_popper_scores: {
      1: 0.1781038603429162,
      2: 0.20681531821338897,
      3: 0.18722903469367339,
      4: 0.19225851720630333,
    },
  },
  "high opportunity rep count": {
    blk_pop: {
      1: 430931,
      2: 718869,
      3: 299840,
      4: 570214,
    },
    asn_pop: {
      1: 49960,
      2: 33095,
      3: 47992,
      4: 75532,
    },
    hsp_pop: {
      1: 187202,
      2: 219985,
      3: 175766,
      4: 217167,
    },
    wt_pop: {
      1: 1504245,
      2: 1767111,
      3: 1639387,
      4: 1313252,
    },
    tot_pop: {
      1: 2216739,
      2: 2878164,
      3: 2215099,
      4: 2225481,
    },
    minority_pop: {
      1: 668093,
      2: 971949,
      3: 523598,
      4: 862913,
    },
    dem_split: {
      0: 0.4879265287959534,
      1: 0.4314421424608241,
      2: 0.4933326877212794,
      3: 0.6016223593102312,
    },
    rep_split: {
      0: 0.5120734712040467,
      1: 0.5685578575391759,
      2: 0.5066673122787205,
      3: 0.3983776406897688,
    },
    safe_districts: 0,
    opportunity_reps: 0,
    polsby_popper_scores: {
      1: 0.1281934109429523,
      2: 0.19134171386974314,
      3: 0.16785373525576988,
      4: 0.1629203386009065,
    },
  },
  "republican split > .6": {
    blk_pop: {
      1: 739834,
      2: 331147,
      3: 948873,
    },
    asn_pop: {
      1: 103801,
      2: 37467,
      3: 65311,
    },
    hsp_pop: {
      1: 280163,
      2: 209907,
      3: 310050,
    },
    wt_pop: {
      1: 1740021,
      2: 2358361,
      3: 2125613,
    },
    tot_pop: {
      1: 2934559,
      2: 2998544,
      3: 3602380,
    },
    minority_pop: {
      1: 1123798,
      2: 578521,
      3: 1324234,
    },
    dem_split: {
      0: 0.6225054477961202,
      1: 0.38962498414021857,
      2: 0.4950647374618973,
    },
    rep_split: {
      0: 0.37749455220387984,
      1: 0.6103750158597814,
      2: 0.5049352625381027,
    },
    safe_districts: 0,
    opportunity_reps: 0,
    polsby_popper_scores: {
      1: 0.11848409335754378,
      2: 0.18824540655075384,
      3: 0.4647528496833133,
    },
  },
};

function calculateTotalSplit(plan) {
  let dems = 0;
  let reps = 0;
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  for (let i = 0; i < totalDistricts; i++) {
    dems += plan.dem_split[i];
    reps += plan.rep_split[i];
  }
  let percent_dem = dems / totalDistricts;
  let percent_rep = reps / totalDistricts;
  return { percent_dem, percent_rep };
}

//print the winning percentage of each party
function printWinningPercentage(plan) {
  //count number of districts won by each party
  let dems = 0;
  let reps = 0;
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  for (let i = 1; i <= totalDistricts; i++) {
    if (plan.dem_split[i] > plan.rep_split[i]) {
      dems++;
    } else {
      reps++;
    }
  }
  let percent_dem = dems / totalDistricts;
  let percent_rep = reps / totalDistricts;
  console.log("Democrats won " + percent_dem * 100 + "% of districts");
  console.log("Republicans won " + percent_rep * 100 + "% of districts");
}

function calculateAveragePolsbyPopper(plan) {
  let totalScore = 0;
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  for (let i = 1; i <= totalDistricts; i++) {
    totalScore += plan.polsby_popper_scores[i];
  }
  return totalScore / totalDistricts;
}

function castCategory(category) {
  switch (category) {
    case "wt_pop":
      return "WHITE";
    case "blk_pop":
      return "BLACK";
    case "hsp_pop":
      return "HISPANIC";
    case "asn_pop":
      return "ASIAN";
    case "Other":
      return "ignore";
  }
}

function calculateTotalPops(plan) {
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  let categories = ["wt_pop", "blk_pop", "hsp_pop", "asn_pop"];
  let totalPopsByCategory = [];
  for (let i = 0; i < categories.length; i++) {
    let totalPop = 0;
    for (let j = 1; j <= totalDistricts; j++) {
      totalPop += plan[categories[i]][j];
    }
    totalPopsByCategory.push({
      type: castCategory(categories[i]),
      count: totalPop,
    });
  }

  return totalPopsByCategory;
}

function generateDistricts(plan) {
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  let categories = ["wt_pop", "blk_pop", "hsp_pop", "asn_pop"];
  let popsByDistrict = [];
  for (let i = 1; i <= totalDistricts; i++) {
    let district = {};
    district["id"] = i;
    let pops = [];
    for (let j = 0; j < categories.length; j++) {
      pops.push({
        type: castCategory(categories[j]),
        count: plan[categories[j]][i],
      });
    }
    district["populations"] = pops;
    popsByDistrict.push(district);
  }
  return popsByDistrict;
}

function zipSplits(plan) {
  let totalDistricts = Object.keys(plan["tot_pop"]).length;
  let districts = [];
  for (let i = 1; i <= totalDistricts; i++) {
    districts.push([plan.dem_splits[i], plan.rep_splits[i]]);
  }
  return districts;
}

function generateNewPlan(plan, state, type, desc) {
  let splits = calculateTotalSplit(plan);
  let percentDem = splits.percent_dem;
  let percentRep = splits.percent_rep;
  let overview = {
    state: state,
    populations: calculateTotalPops(plan),
    percentDem: percentDem,
    percentRep: percentRep,
    opportunityDistricts: plan.opportunity_reps,
    safeDistricts: plan.safe_districts,
    polsbyPopperScore: calculateAveragePolsbyPopper(plan),
  };
  let districts = generateDistricts(plan);

  return {
    description: desc,
    overview: overview,
    districts: districts,
    type: type,
  };
}

function generateNewPlans(plans, state, type) {
  let newPlans = [];
  for (let key in plans) {
    // printWinningPercentage(plans[key]);
    // console.log();
    newPlans.push(generateNewPlan(plans[key], state, type, key));
  }
  return newPlans;
}

//import fs
const fs = require("fs");
let newPlans = generateNewPlans(plans, "North Carolina", "MMD");
//console.log(newPlans);
//output the new plans to a json file called "nc unique plans MMD.json"
fs.writeFileSync("nc unique plans MMD.json", JSON.stringify(newPlans));
