from pymongo import MongoClient
from bson import ObjectId
from geojson import Point

# MongoDB connection parameters
mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
database_name = "Chártis_DB"
collection_name = "GeoMarkers"


def insert(clickx: float, clicky: float, category: str):

    # document = {
    #     "_id": ObjectId(),             # Generate a new ObjectId for the ID field
    #     "Building_name": "Abele quad",
    #     "User_name": "Aly",
    #     "category": "Ramp",
    #     "location": Point((-80.93811468423945, 36.002139542082276)),  # GeoJSON Point object
    #     "floor": 0,
    #     "rating": 2,
    #     "description": "Not good"
    # }

    document = {
        "_id": ObjectId(),             # Generate a new ObjectId for the ID field
        "location": Point((clickx, clicky)),  # GeoJSON Point object
        "category": category  
    }

    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client[database_name]
        collection = db[collection_name]

        # Insert the document into the collection
        inserted_id = collection.insert_one(document).inserted_id

        # Print the ID of the inserted document
        print(f"Inserted document ID: {inserted_id}")

    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        # Close the MongoDB connection
        client.close()
