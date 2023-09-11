from pymongo import MongoClient
import geojson
from geopy.distance import geodesic


def initialize():

    # MongoDB connection 
    mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
    database_name = "Chártis_DB"
    collection_name = "GeoMarkers"

    with open('walkingpaths.geojson', 'r') as file:
        geojson_data = geojson.load(file)

    graph = {}

    for feature in geojson_data['features']:
        if feature['geometry']['type'] == 'LineString':
            coordinates = feature['geometry']['coordinates']
            for i in range(len(coordinates) - 1):
                coord1 = tuple(coordinates[i])
                coord2 = tuple(coordinates[i + 1])
                weight = geodesic(coord1, coord2).meters
                graph.setdefault(coord1, []).append((coord2, weight))
                graph.setdefault(coord2, []).append((coord1, weight))

    # Getting stairs from DB
    stairs = []
    try:
        client = MongoClient(mongo_uri)
        db = client[database_name]
        collection = db[collection_name]

        filter_criteria = {"category": "stairs"}
        results = collection.find(filter_criteria, {"location.coordinates": 1, "_id": 0})

        for result in results:
            stairs.append(result["location"]["coordinates"])
    except Exception as e:
        print(f"Error: {str(e)}")
    finally:
        client.close()

    for s in stairs:
        arbitrary_coord = (s[0], s[1])

        distances = {}
        for vertex in graph.keys():
            distance = geodesic(arbitrary_coord, vertex).meters
            distances[vertex] = distance

        sorted_nodes = sorted(distances, key=lambda k: distances[k])[:5]

        closest_edge = None
        closest_distance = float('inf')       

        # Iterate through the 5 closest nodes and their adjacent edges
        for node in sorted_nodes:
            for adjacent_vertex, weight in graph[node]:
                distance_to_start = geodesic(arbitrary_coord, node).meters
                distance_to_end = geodesic(arbitrary_coord, adjacent_vertex).meters

                edge_length = geodesic(node, adjacent_vertex).meters

                t = min(1, max(0, (distance_to_start ** 2) / (distance_to_start ** 2 + distance_to_end ** 2)))

                interpolated_point = (
                    node[0] + t * (adjacent_vertex[0] - node[0]),
                    node[1] + t * (adjacent_vertex[1] - node[1])
                )

                distance_to_interpolated_point = geodesic(arbitrary_coord, interpolated_point).meters

                # Update closest_edge if the distance is smaller
                if distance_to_interpolated_point < closest_distance:
                    closest_edge1 = node
                    closest_edge2 = adjacent_vertex
                    #closest_edge = ((node, adjacent_vertex), distance_to_interpolated_point)
                    #closest_distance = distance_to_interpolated_point

        # Print the closest edge and its distance
        # print(f"Closest Edge to Arbitrary Point: {closest_edge[0]}, Distance: {closest_edge[1]} meters")

        # Update the weight between (x1, y1) and (x2, y2) to infinity
        for index, (node, weight) in enumerate(graph[closest_edge1]):
            if node == (closest_edge2):
                graph[closest_edge1][index] = (closest_edge2, float("inf"))
                break

        for index, (node, weight) in enumerate(graph[closest_edge2]):
            if node == closest_edge1:
                graph[closest_edge2][index] = (closest_edge1, float("inf"))
                break


    def find_nearest_node(graph, coord):
        return min(graph.keys(), key=lambda x: geodesic(coord, x).meters)


    def dijkstra(graph, start, end):
        queue = []
        visited = {node: (float('inf'), None) for node in graph}
        visited[start] = (0, None)

        queue.append(start)

        while queue:
            current_node = min(queue, key=lambda node: visited[node][0])
            queue.remove(current_node)

            if current_node == end:
                path = []
                while current_node:
                    path.insert(0, current_node)
                    current_node = visited[current_node][1]
                return path

            for neighbor, weight in graph[current_node]:
                distance = visited[current_node][0] + weight
                if distance < visited[neighbor][0]:
                    visited[neighbor] = (distance, current_node)
                    queue.append(neighbor)

    
