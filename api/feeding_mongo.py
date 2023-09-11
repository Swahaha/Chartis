from pymongo import MongoClient
from bson import ObjectId
from geojson import Point

# MongoDB connection parameters
mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
database_name = "Chártis_DB"
collection_name = "Slopes"

def insert_coordinates(coordinates, category):
    try:
        # Connect to MongoDB
        client = MongoClient(mongo_uri)
        db = client[database_name]
        collection = db[collection_name]

        for lat1, long1, lat2, long2 in coordinates:
            document = {
                "_id": ObjectId(),             # Generate a new ObjectId for the ID field
                "pt1": Point((lat1, long1)),  # GeoJSON Point object
                "pt2": Point((lat2, long2)),  # GeoJSON Point object
                "category": category  
            }

            # Insert the document into the collection
            inserted_id = collection.insert_one(document).inserted_id

            # Print the ID of the inserted document
            print(f"Inserted document ID: {inserted_id}")

    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        # Close the MongoDB connection
        client.close()


coordinates_list = [
    [36.000610, -78.940130, 35.999058, -78.941377],
    [35.997889, -78.941477, 35.998719, -78.940913],
    [35.997624, -78.940847, 35.998418, -78.940289],
    [35.997947, -78.939251, 35.999058, -78.941377],
    [35.999696, -78.943035, 35.999058, -78.941377],
    [35.999309, -78.940239, 35.998784, -78.940674],
    [35.999851, -78.940732, 35.999539, -78.940104],
    [36.000057, -78.944171, 36.002547, -78.942131]
]

category = "line"
insert_coordinates(coordinates_list, category)