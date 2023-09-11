'''import json

input_str = "[-78.94084, 35.999879] [-78.940729, 36.000404] [-78.939969, 36.000433] [-78.940488, 36.000349] [-78.939577, 36.00037] [-78.942512, 35.997918] [-78.942415, 35.998123] [-78.94136, 35.999336] [-78.937661, 36.001493] [-78.937111, 36.000731] [-78.935441, 35.99828] [-78.936769, 35.999045] [-78.936726, 36.00139] [-78.936381, 36.002506] [-78.936787, 36.0027] [-78.939112, 36.00424] [-78.940539, 36.003627] [-78.941309, 36.003154] [-78.941541, 36.003143] [-78.941527, 36.003596]"

coordinate_strings = input_str.split('] [')
coordinate_pairs = [list(map(float, s.strip('[]').split(', '))) for s in coordinate_strings]

# Step 3: Create the dictionary structure
feature_collection = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": [pair[1], pair[0]],
                "type": "Point"
            }
        } for pair in coordinate_pairs
    ]
}

# Step 4: Serialize the dictionary to a JSON string
json_str = json.dumps(feature_collection, indent=2)
print(json_str)'''

import json

data = [
    [-78.94084, 35.999879],
    [-78.940729, 36.000404],
    [-78.939969, 36.000433],
    [-78.940488, 36.000349],
    [-78.939577, 36.00037],
    [-78.942512, 35.997918],
    [-78.942415, 35.998123],
    [-78.94136, 35.999336],
    [-78.937661, 36.001493],
    [-78.937111, 36.000731],
    [-78.935441, 35.99828],
    [-78.936769, 35.999045],
    [-78.936726, 36.00139],
    [-78.936381, 36.002506],
    [-78.936787, 36.0027],
    [-78.939112, 36.00424],
    [-78.940539, 36.003627],
    [-78.941309, 36.003154],
    [-78.941541, 36.003143],
    [-78.941527, 36.003596]
]

geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "coordinates": coords,
                "type": "Point"
            }
        }
        for coords in data
    ]
}

# Convert the Python dictionary to a JSON string
geojson_str = json.dumps(geojson, indent=2)

# Print or save the JSON string to a file
print(geojson_str)