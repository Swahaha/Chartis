# getting data from the mongo db and creating json files

# slopes json

import re
import json
from pymongo import MongoClient

client = MongoClient('mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/')

db = client.Chártis_DB

collection = db.Slopes

def convert_to_geojson(input_str):
    coordinates = re.findall(r'\[([\d\.-]+),\s*([\d\.-]+)\]', input_str)
    coordinates = [[float(x), float(y)] for x, y in coordinates]

    geojson_structure = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "coordinates": coordinates,
            "type": "LineString"
        }
    }
    
    return json.dumps(geojson_structure, indent=2)

# Input string
input_str = "[36.000610, -78.940130] [35.999058, -78.941377]"

# Get the converted geojson string
geojson_str = convert_to_geojson(input_str)
#print(geojson_str)

coordinate_strings = []

# Query the collection and retrieve the coordinates from each matching document
for result in collection.find({'category': 'line'}):
    try:
        # Retrieve the coordinates from the pt1 and pt2 fields
        pt1_coordinates = result['pt1']['coordinates']
        pt2_coordinates = result['pt2']['coordinates']
        
        # Check if coordinates are present and add them to the list as formatted strings
        if pt1_coordinates and pt2_coordinates:
            to_add = f"[{pt1_coordinates[0]}, {pt1_coordinates[1]}]" + " " + f"[{pt2_coordinates[0]}, {pt2_coordinates[1]}]"
            coordinate_strings.append(to_add)
        else:
            print("Coordinates not found in document:", result['_id'])
    except KeyError as e:
        # Handle documents that do not have the expected structure
        print(f"KeyError: {e} not found in document:", result['_id'])

# Close the client connection
client.close()

features = []

# Loop through each line in the input data
for line in coordinate_strings:
    # Split the line into two coordinate strings
    coords_strings = line.split('] [')
    
    # Extract the individual coordinates
    coords1 = list(map(float, coords_strings[0][1:].split(', ')))
    coords2 = list(map(float, coords_strings[1][:-1].split(', ')))
    
    # Create a new feature with the coordinates swapped to [longitude, latitude] and add it to the features list
    feature = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "coordinates": [
                [coords1[1], coords1[0]],
                [coords2[1], coords2[0]]
            ],
            "type": "LineString"
        }
    }
    features.append(feature)

# Create the final JSON object
geojson = {
    "type": "FeatureCollection",
    "features": features
}

# Convert the JSON object to a string
geojson_str = json.dumps(geojson, indent=2)

# Print the JSON string
print(geojson_str)