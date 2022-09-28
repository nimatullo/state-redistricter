import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

const savePath =
  "/Users/sherzodnimatullo/code/projects/416/states-redistrictor/src/main/resources/json/northcarolina.geojson";

fs.writeFile(
  savePath,
  JSON.stringify(await getGeoJSONForState("NC", 13)),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
