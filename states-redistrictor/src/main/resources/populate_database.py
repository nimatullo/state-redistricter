import json
import pymongo


if __name__ == "__main__":
    #Make sure you're in the same directory as the script
    json_data = json.load(open("./json/db_dummy_data.json"))
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["states-redistrictor"]
    col = db["states"]
    col.insert_many(json_data)