import json
import pymongo
import os


if __name__ == "__main__":
    #Make sure you're in the same directory as the script
    state="nc"
    state_file = "./{state} (final format)/{state} state.json".format(state=state)
    smd_unique_plans_dir = "./{state} (final format)/unique plans/smd/".format(state=state)
    mmd_unique_plans_dir = "./{state} (final format)/unique plans/mmd/".format(state=state)
    state_shape_file = "./{state} (final format)/{state} state.geojson".format(state=state)

    json_data = json.load(open(state_file))
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["states-redistrictor"]

    col = db["states"]
    col.insert_many(json_data)

    col = db["smd_unique_plan_shapes"]
    for file in os.listdir(smd_unique_plans_dir):
        files = []
        if file.endswith(".geojson"):
            json_data = json.load(open(smd_unique_plans_dir+ file))
            files.append(json_data)
    col.insert_many(files)

    col = db["mmd_unique_plan_shapes"]
    for file in os.listdir(mmd_unique_plans_dir):
        files = []
        if file.endswith(".geojson"):
            json_data = json.load(open(mmd_unique_plans_dir+ file))
            files.append(json_data)
    col.insert_many(files)

    col = db["state_shapes"]
    json_data = json.load(open(state_shape_file))
    col.insert_many([json_data])
     
