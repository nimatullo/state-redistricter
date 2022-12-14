let uniqueDistrictPlanIdCounter = 0;
let fs = require("fs");
let rawSMDData = JSON.parse(fs.readFileSync("../virginia/data.json"));
let rawMMDData = JSON.parse(
  fs.readFileSync(
    "/home/niko/development/416/gerrychain/seawulf-scripts/state_summary_data/va_data.json"
  )
);
let state = "Virginia";
let abbreviation = "VA";
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
  if (category.toLowerCase().includes("dem_split_box")) return "DEMOCRAT";
  if (category.toLowerCase().includes("rep_split_box")) return "REPUBLICAN";
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
  "dem_split_box_data",
  "rep_split_box_data",
];

function convertBoxDataToPercents(rawData, boxDataField, pattern) {
  let newBoxData = {};
  let oldBoxData =
    pattern === undefined
      ? rawData[boxDataField]
      : rawData[pattern][boxDataField];
  let totalPops =
    pattern === undefined ? rawData.total_pop : rawData[pattern].total_pop;

  for (let district in oldBoxData) {
    newBoxData[district] = {};
    for (let boxData in oldBoxData[district]) {
      newBoxData[district][boxData] =
        oldBoxData[district][boxData] / (totalPops[district] * 1.0);
    }
  }
  return newBoxData;
}

function getAnalysisData(rawData, fieldsToAnalyze, pattern) {
  let analysisData = {};
  analysisData["boxAndWhiskerPlots"] = {};
  analysisData["partyBoxAndWhiskerPlots"] = {};
  for (let field of fieldsToAnalyze) {
    let newField = castCategory(field);
    if (
      field.toLowerCase().includes("box_data") &&
      !field.toLowerCase().includes("split")
    ) {
      let boxData = convertBoxDataToPercents(rawData, field, pattern);
      analysisData["boxAndWhiskerPlots"][newField] = boxData;
    } else if (field.toLowerCase().includes("split_box_data")) {
      if (pattern !== undefined) {
        analysisData["partyBoxAndWhiskerPlots"][newField] =
          rawData[pattern][field];
      } else {
        analysisData["partyBoxAndWhiskerPlots"][newField] = rawData[field];
      }
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
let SMDEnsembles = [getEnsembleSummaryData(rawSMDData, fieldsToAvg)];
let SMDAnalysisData = [getAnalysisData(rawSMDData, fieldsToAnalyze)];
let SMDUniquePlansData = getUniquePlansData(rawSMDData, state);

////////////////////////////////// MMD Parsing //////////////////////////////////
let MMDEnsembles = [];
let MMDAnalysisData = [];
let MMDUniquePlansData = getUniquePlansData(rawMMDSubEnsembles, state, "MMD");
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
  name: state,
  abbreviation: abbreviation,
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
fs.writeFileSync(
  state + " boxplot data.json",
  JSON.stringify(finalExport.ensembleSummaryData.MMD)
);
