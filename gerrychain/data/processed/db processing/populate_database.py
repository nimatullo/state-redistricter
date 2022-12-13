import json
import pymongo

if __name__ == "__main__":
    #Make sure you're in the same directory as the script

    states_file = "./db_import.json"
    json_data = json.load(open(states_file))
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["states-redistrictor"]

    col = db["states"]
    col.insert_many(json_data)


