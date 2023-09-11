from pymongo import MongoClient

# MongoDB connection parameters
mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
database_name = "Chártis_DB"
collection_name = "GeoMarkers"

try:
    # Connect to MongoDB
    client = MongoClient(mongo_uri)
    db = client[database_name]
    collection = db[collection_name]

    # Query the database for entries with category equal to "accessible bathroom"
    filter_criteria = {"category": "Accessible Bathroom"}
    results = collection.find(filter_criteria)

    # Print the information for each matching entry
    for result in results:
        print("Entry ID:", result["_id"])
        print("Building Name:", result["Building_name"])
        print("User Name:", result["User_name"])
        print("Category:", result["category"])
        print("Location:", result["location"])
        print("Floor:", result["floor"])
        print("Rating:", result["rating"])
        print("Description:", result["description"])
        print()

except Exception as e:
    print(f"Error: {str(e)}")
finally:
    # Close the MongoDB connection
    client.close()
