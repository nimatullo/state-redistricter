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
  const path = dirname(thisPath) + "/../../dummy_json/arkansas";
  const files = _getAllJSONFromPath(path);

  const result = {};

  for (const file of files) {
    result[file[0].Subject.replace(/\s+/g, "")] = file.map((info) => {
      const data = {
        title: info.Title,
      };
      const districts = Object.values(info).slice(2);
      return { ...data, districts };
    });
  }

  return result;
};

fs.writeFile("data.json", JSON.stringify(getDistrictData()), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
