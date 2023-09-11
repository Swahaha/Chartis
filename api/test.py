from pymongo import MongoClient

stairs = []


def get_stairs():
    # MongoDB connection parameters
    mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
    database_name = "Chártis_DB"
    collection_name = "GeoMarkers"

    try:
        client = MongoClient(mongo_uri)
        db = client[database_name]
        collection = db[collection_name]

        filter_criteria = {"category": "stairs"}
        results = collection.find(filter_criteria, {"location.coordinates": 1, "_id": 0})

        for result in results:
            stairs.append(result["location"]["coordinates"])
            print(result["location"]["coordinates"])
    except Exception as e:
        print(e)
    finally:
        client.close()


'''
 def get_buildings():

    # MongoDB connection parameters
    mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
    database_name = "Chártis_DB"
    collection_name = "GeoMarkers"

    buildings = []

    try:
        client = MongoClient(mongo_uri)
        db = client[database_name]
        collection = db[collection_name]

        filter_criteria = {"category": "stairs"}
        results = collection.find(filter_criteria, {"location.coordinates": 1, "_id": 0})

        for result in results:
            buildings.append(result["location"]["coordinates"])
    except Exception as e:
        print(e)
    finally:
        client.close()

    return buildings
    '''