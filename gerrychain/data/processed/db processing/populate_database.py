import json
import pymongo
import os


if __name__ == "__main__":
    #Make sure you're in the same directory as the script
    state="nc"
    state_file = "./{state}/{state} state.json".format(state=state)
    unique_plans_dir = "./{state}/unique plans/".format(state=state)
    state_shape_file = "./{state}/{state} state.geojson".format(state=state)

    json_data = json.load(open(state_file))
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["states-redistrictor"]

    col = db["states"]
    col.insert_many(json_data)

    col = db["unique_plan_shapes"]
    for file in os.listdir(unique_plans_dir):
        files = []
        if file.endswith(".geojson"):
            json_data = json.load(open(unique_plans_dir+ file))
            files.append(json_data)
    
    col.insert_many(files)

    col = db["state_shapes"]
    json_data = json.load(open(state_shape_file))
    col.insert_many([json_data])
     
