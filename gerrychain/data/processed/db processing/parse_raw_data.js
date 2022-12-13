let uniqueDistrictPlanIdCounter = 0;
let fs = require("fs");
let rawSMDData = JSON.parse(fs.readFileSync("../north carolina/data.json"));
let rawMMDData = JSON.parse(
  fs.readFileSync("../north carolina/nc mmd data.json")
);
//get all the objects in the "all_data" field
let rawMMDSubEnsembles = rawMMDData.all_data;

let fieldsToAvg = [
  "polsby_popper_scores",
  "rep_splits",
  "dem_splits",
  "opportunity_reps",
  "equal_pop",
];

function castCategory(category) {
  if (
    category.toLowerCase().includes("black") ||
    category.toLowerCase().includes("blk_")
  )
    return "BLACK";
  if (
    category.toLowerCase().includes("hispanic") ||
    category.toLowerCase().includes("hsp_")
  )
    return "HISPANIC";
  if (
    category.toLowerCase().includes("asian") ||
    category.toLowerCase().includes("asn_")
  )
    return "ASIAN";
  if (
    category.toLowerCase().includes("white") ||
    category.toLowerCase().includes("wt_")
  )
    return "WHITE";
  return category;
}

function getEnsembleSummaryData(rawData, fieldsToAvg, pattern, planType) {
  let SMDSummaryData = {};

  for (let field of fieldsToAvg) {
    let sum = 0;
    let count = 0;
    //if field's value is 0, then save it as is
    if (rawData[field] === 0) {
      SMDSummaryData[field] = 0;
      continue;
    }

    for (let district in rawData[field]) {
      sum += rawData[field][district];
      count++;
    }
    SMDSummaryData[field] = count === 0 ? rawData[field] : sum / count;
  }
  SMDSummaryData = convertFieldsToCamelCase(SMDSummaryData, "avg");
  SMDSummaryData["planType"] = planType === undefined ? "SMD" : planType;
  SMDSummaryData["totalDistrictPlans"] = 10000;
  SMDSummaryData["pattern"] = pattern === undefined ? "SMD" : pattern;
  return SMDSummaryData;
}

function convertFieldsToCamelCase(object, prefixWord) {
  let newObject = {};
  for (let field in object) {
    let newField = field
      .split("_")
      .map((word, index) => {
        if (index === 0) {
          if (prefixWord === undefined)
            return word[0].toLowerCase() + word.slice(1);
          else return prefixWord + word[0].toUpperCase() + word.slice(1);
        }
        return word[0].toUpperCase() + word.slice(1);
      })
      .join("");
    newObject[newField] = object[field];
  }
  return newObject;
}

let fieldsToAnalyze = [
  "black_pop_box_data",
  "white_pop_box_data",
  "asian_pop_box_data",
  "hispanic_pop_box_data",
];

function getAnalysisData(rawData, fieldsToAnalyze, pattern) {
  let analysisData = {};
  //console.log(rawData);
  console.log(pattern);
  analysisData["boxAndWhiskerPlots"] = {};
  for (let field of fieldsToAnalyze) {
    let newField = castCategory(field);
    if (field.toLowerCase().includes("box_data")) {
      if (pattern !== undefined)
        analysisData["boxAndWhiskerPlots"][newField] = rawData[pattern][field];
      else analysisData["boxAndWhiskerPlots"][newField] = rawData[field];
    } else analysisData[newField] = rawData[field];
  }

  let oppReps;
  let demRepSplitCounts;
  let demVoteShare;
  let demSeatShare;
  let repVoteShare;
  let repSeatShare;
  let oppRepsArray = [];
  let demRepSplitCountsArray = [];
  if (pattern === undefined) {
    oppReps = rawData.bar_data.opportunity_reps;
    demRepSplitCounts = rawData.bar_data.rep_total_count;
    demVoteShare = rawData.dem_vote_share_percentage;
    demSeatShare = rawData.dem_seat_share_percentage;
    repVoteShare = rawData.rep_vote_share_percentage;
    repSeatShare = rawData.rep_seat_share_percentage;
  } else {
    oppReps = rawData.bar_data.opportunity_reps[pattern].opportunity_reps;
    console.log(oppReps);
    demRepSplitCounts = rawData.bar_data.rep_total_count;
    demVoteShare = rawData[pattern].dem_vote_share_percentage;
    demSeatShare = rawData[pattern].dem_seat_share_percentage;
    repVoteShare = rawData[pattern].rep_vote_share_percentage;
    repSeatShare = rawData[pattern].rep_seat_share_percentage;
  }
  for (let district in oppReps) {
    oppRepsArray[district] = oppReps[district];
  }
  if (pattern !== undefined) oppRepsArray = oppRepsArray.slice(1); //import file was offset by 1
  for (let district in demRepSplitCounts) {
    demRepSplitCountsArray[district] = demRepSplitCounts[district];
  }

  analysisData["opportunityRepCounts"] = oppRepsArray;
  analysisData["demRepSplitCounts"] = demRepSplitCountsArray;
  analysisData["voteSeatSharePercentages"] = {
    DEMOCRAT: [demVoteShare, demSeatShare],
    REPUBLICAN: [repVoteShare, repSeatShare],
  };

  analysisData["pattern"] = pattern === undefined ? "SMD" : pattern;
  return analysisData;
}

function getUniquePlansData(rawData, state, planType) {
  let rawUniquePlans = rawData["unique_plans_data"];
  let uniquePlansData = {};
  uniquePlansData["uniqueDistrictPlans"] = [];
  for (let plan in rawUniquePlans) {
    let newPlan = {};
    newPlan["planType"] = planType === undefined ? "SMD" : planType;
    newPlan["description"] = plan;
    newPlan["shape"] = "polygon";
    newPlan["id"] = uniqueDistrictPlanIdCounter++;

    plan = rawUniquePlans[plan]; //convert plan from string to object

    let overview = {};
    overview["state"] = state;
    overview["opportunityDistricts"] = plan["opportunity_reps"];
    overview["safeDistricts"] = plan["safe_districts"];
    //avg polsby popper score
    overview["polsbyPopperScore"] = Object.values(
      plan["polsby_popper_scores"]
    ).reduce((a, b) => a + b, 0);
    overview["polsbyPopperScore"] /= Object.keys(
      plan["polsby_popper_scores"]
    ).length;
    newPlan["overview"] = overview;

    let numDistricts = Object.keys(plan["tot_pop"]).length;
    //create a map with district number as key and district data as value
    let districtMap = {};
    for (let i = 0; i < numDistricts; i++) {
      districtMap[i + 1] = {};
      districtMap[i + 1]["populations"] = [];
    }
    let fieldsToParse = [
      "blk_pop",
      "wt_pop",
      "asn_pop",
      "hsp_pop",
      "rep_split",
      "dem_split",
    ];
    //for each field to parse, map the number key to the numbered district
    for (let field of fieldsToParse) {
      for (let district in plan[field]) {
        if (field === "rep_split" || field === "dem_split") {
          //need to adjust offset in file
          let newDistrictId =
            planType === "MMD" ? Number(district) + 1 + "" : district;
          let newField = field === "rep_split" ? "repSplit" : "demSplit";
          districtMap[newDistrictId][newField] = plan[field][district];
        } else
          districtMap[district]["populations"].push({
            type: castCategory(field),
            count: plan[field][district],
          });
      }
    }

    //add district map to new plan
    //convert district map to an array of objects with an id field equal to their key
    let districtArray = [];
    for (let district in districtMap) {
      districtMap[district]["id"] = district;
      districtArray.push(districtMap[district]);
    }
    newPlan["districts"] = districtArray;
    uniquePlansData["uniqueDistrictPlans"].push(newPlan);
  }
  return uniquePlansData;
}

////////////////////////////////// SMD Parsing //////////////////////////////////
//console.log(getEnsembleSummaryData(rawSMDData, fieldsToAvg));
//console.log(getAnalysisData(rawSMDData, fieldsToAnalyze));
//console.log(getUniquePlansData(rawSMDData, "North Carolina"));
let SMDEnsembles = [getEnsembleSummaryData(rawSMDData, fieldsToAvg)];
let SMDAnalysisData = [getAnalysisData(rawSMDData, fieldsToAnalyze)];
let SMDUniquePlansData = getUniquePlansData(rawSMDData, "North Carolina");

////////////////////////////////// MMD Parsing //////////////////////////////////
let MMDEnsembles = [];
let MMDAnalysisData = [];
let MMDUniquePlansData = getUniquePlansData(
  rawMMDSubEnsembles,
  "North Carolina",
  "MMD"
);
let allUniquePlansData = SMDUniquePlansData.uniqueDistrictPlans.concat(
  MMDUniquePlansData.uniqueDistrictPlans
);

for (let subEnsemble in rawMMDSubEnsembles) {
  //if field contains "unique_plans_data ignore"
  if (subEnsemble === "unique_plans_data" || subEnsemble === "bar_data")
    continue;

  let subEnsembleData = rawMMDSubEnsembles[subEnsemble];
  let subEnsemblePattern = subEnsemble;

  let subEnsembleSummaryData = getEnsembleSummaryData(
    subEnsembleData,
    fieldsToAvg,
    subEnsemblePattern,
    "MMD"
  );
  let subEnsembleAnalysisData = getAnalysisData(
    rawMMDSubEnsembles,
    fieldsToAnalyze,
    subEnsemblePattern
  );
  //push to array
  MMDEnsembles.push(subEnsembleSummaryData);
  MMDAnalysisData.push(subEnsembleAnalysisData);
}

let finalExport = {
  name: "North Carolina",
  abbreviation: "NC",
  stateShape: "polygon",
  uniqueDistrictPlans: allUniquePlansData,
  analyses: {
    SMD: SMDAnalysisData,
    MMD: MMDAnalysisData,
  },
  ensembleSummaryData: {
    SMD: SMDEnsembles,
    MMD: MMDEnsembles,
  },
};
//console.log(finalExport);
//console.log(JSON.stringify({"MMD": MMDEnsembles}));
//console.log(JSON.stringify({ MMD: MMDAnalysisData }));

// console.log();
// console.log(
//   JSON.stringify(
//     getUniquePlansData(rawMMDSubEnsembles, "North Carolina", "MMD")
//   )
// );
// //print out full object using util.inspect
//let util = require("util");

fs.writeFileSync("NCtest.json", JSON.stringify(finalExport));
//console.log(getEnsembleSummaryData(rawSMDData, fieldsToAvg));
//console.log(util.inspect(finalExport, false, null, true));
