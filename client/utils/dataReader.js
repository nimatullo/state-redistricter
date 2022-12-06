import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import FloridaData from "../dummy_json/florida/data.json" assert { type: "json" };
import ArkansasData from "../dummy_json/arkansas/data.json" assert { type: "json" };
import NorthCarolinaData from "../dummy_json/north_carolina/data.json" assert { type: "json" };

const _getAllJSONFromPath = (path) => {
  const files = fs.readdirSync(path);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));
  const jsonObjects = jsonFiles.map((file) => {
    const filePath = path + "/" + file;
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  });
  return jsonObjects;
};

const getDistrictData = () => {
  const thisPath = fileURLToPath(import.meta.url);
  const path = dirname(thisPath) + "/../dummy_json/florida";
  const files = _getAllJSONFromPath(path);

  const result = {};

  for (const file of files) {
    result[file[0].Subject.replace(/\s+/g, "")] = file.map((info) => {
      const data = {
        title: info.Title,
      };
      const districts = Object.values(info)
        .slice(2)
        .map((district) => district.replace(/,/g, ""));
      return { ...data, districts };
    });
  }

  return result;
};

const getGeoJSONForState = async (state, totalDistricts) => {
  const districts = [];

  for (let i = 1; i <= totalDistricts; i++) {
    const district = await _fetchDistrict(state, i);
    districts.push(district);
  }

  return districts;
};
const getStateData = (state) => {
  switch (state.toLowerCase()) {
    case "florida":
      return FloridaData;
    case "arkansas":
      return ArkansasData;
    case "north carolina":
      return NorthCarolinaData;
    default:
      break;
  }
};

const getPercentages = () => {
  const ourStates = ["florida", "arkansas", "north carolina"];
  const allData = ourStates.map((state) => getStateData(state));

  const deez = allData.map((data, ind) => {
    return {
      state: ourStates[ind],
      percentages: Object.keys(data).map((key) => {
        const total = sum(data[key][0].districts);
        const rest = data[key].splice(1);
        return {
          [key]: rest.map((arr) => {
            return {
              title: arr.title,
              percentage: (sum(arr.districts) / total) * 100,
            };
          }),
        };
      }),
    };
  });

  return deez;

  // const stateData = getStateData("florida");
  // let raceData = stateData.SexandAge;
  // const totalPopulationOfState = raceData[0].districts.reduce(
  //   (x, sum) => Number(x) + Number(sum)
  // );
  // raceData = raceData.splice(1);

  // return raceData.map((race) => {
  //   return {
  //     title: race.title,
  //     percentage: (sum(race.districts) / totalPopulationOfState) * 100,
  //   };
  // });
};

const sum = (arr) => arr.reduce((x, sum) => Number(x) + Number(sum));

const _fetchDistrict = async (state, district) => {
  const GH_RAW_URL =
    "https://raw.githubusercontent.com/unitedstates/districts/gh-pages/cds/2012";
  const url = `${GH_RAW_URL}/${state}-${district}/shape.geojson`;
  const response = await fetch(url);
  const districtGeoJSON = await response.json();

  return {
    type: "Feature",
    id: district,
    properties: {
      name: `${state}-${district}`,
    },
    geometry: districtGeoJSON,
  };
};

// getPercentages();

// const savePath =
//   "/Users/sherzodnimatullo/code/projects/416/states-redistrictor/src/main/resources/json/northcarolina.geojson";

const assignPartiesToDistricts = () => {
  const geojsonpath =
    "/Users/sherzodnimatullo/code/projects/416/states-redistrictor/src/main/resources/json/virginia.geojson";
  const geojson = JSON.parse(fs.readFileSync(geojsonpath, "utf8"));
  const features = geojson.features;
  const assignment = {
    8: "D",
    11: "D",
    2: "D",
    4: "D",
    3: "D",
    7: "D",
    10: "D",
    6: "R",
    1: "R",
    5: "R",
    9: "R",
  };

  features.forEach((district) => {
    district.properties.party =
      assignment[Number(district.properties.DISTRICT)];
  });

  geojson.features = features;

  fs.writeFileSync(geojsonpath, JSON.stringify(geojson), "utf8");
};

assignPartiesToDistricts();

// fs.writeFile("percentages.json", JSON.stringify(getPercentages()), (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });
