from pymongo import MongoClient
import geojson
from geopy.distance import geodesic


class Graph:
    def __init__(self):
        mongo_uri = "mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/"
        database_name = "Chártis_DB"
        collection_name = "GeoMarkers"

        with open('walkingpaths.geojson', 'r') as file:
            geojson_data = geojson.load(file)

        self.graph = {}
        self.path_c = []
        self.path_d = []

        for feature in geojson_data['features']:
            if feature['geometry']['type'] == 'LineString':
                coordinates = feature['geometry']['coordinates']
                for i in range(len(coordinates) - 1):
                    coord1 = tuple(coordinates[i])
                    coord2 = tuple(coordinates[i + 1])
                    weight = geodesic(coord1, coord2).meters
                    self.graph.setdefault(coord1, []).append((coord2, weight))
                    self.graph.setdefault(coord2, []).append((coord1, weight))

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
            print(e)
        finally:
            client.close()

        for s in stairs:
            arbitrary_coord = (s[0], s[1])

            distances = {}
            for vertex in self.graph.keys():
                distance = geodesic(arbitrary_coord, vertex).meters
                distances[vertex] = distance

            sorted_nodes = sorted(distances, key=lambda k: distances[k])[:5]

            closest_distance = float('inf')

            # Iterate through the 5 closest nodes and their adjacent edges
            for node in sorted_nodes:
                for adjacent_vertex, weight in self.graph[node]:
                    distance_to_start = geodesic(arbitrary_coord, node).meters
                    distance_to_end = geodesic(arbitrary_coord, adjacent_vertex).meters

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
                        # closest_edge = ((node, adjacent_vertex), distance_to_interpolated_point)
                        # closest_distance = distance_to_interpolated_point

            # Update the weight between (x1, y1) and (x2, y2) to infinity
            for index, (node, weight) in enumerate(self.graph[closest_edge1]):
                if node == (closest_edge2):
                    self.graph[closest_edge1][index] = (closest_edge2, float("inf"))
                    break

            for index, (node, weight) in enumerate(self.graph[closest_edge2]):
                if node == closest_edge1:
                    self.graph[closest_edge2][index] = (closest_edge1, float("inf"))
                    break

    def find_nearest_node(self, coord):
        return min(self.graph.keys(), key=lambda x: geodesic(coord, x).meters)

    def dijkstra(self, start, end):
        queue = []

        visited = {node: (float('inf'), None) for node in self.graph}
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

            for neighbor, weight in self.graph[current_node]:
                distance = visited[current_node][0] + weight
                if distance < visited[neighbor][0]:
                    visited[neighbor] = (distance, current_node)
                    queue.append(neighbor)

    def navigation(self, start_x, start_y, end_x, end_y):
        # Define your start and end coordinates
        # start_x = input()
        # start_y = input()
        # end_x = input()
        # end_y = input()
        start_coord = (start_x, start_y)
        end_coord = (end_x, end_y)

        # start_coord = (-78.9280652, 36.0077519)  # Replace with your start coordinate
        # end_coord = (-78.9358661, 36.0055298)  # Replace with your end coordinate

        # Find the nearest nodes to your start and end coordinates
        start_node = self.find_nearest_node(start_coord)
        end_node = self.find_nearest_node(end_coord)

        # Find the shortest path using Dijkstra's algorithm
        path = self.dijkstra(start_node, end_node)
        self.path_c = [node for node in path]

        distance = 0

        if self.path_c:
            self.path_d = list(range(len(self.path_c)))
            distance = geodesic(end_node, self.path_c[len(self.path_c)-1]).meters
            for i in range(len(self.path_c)-1, 0, -1):
                distance += geodesic(self.path_c[i], self.path_c[i-1]).meters
                # print(self.path_c[i])
                self.path_d[i] = distance
            self.path_d[0] = geodesic(self.path_c[0], start_node).meters + distance

        #    print(f'Distance from current location to the end of the path = {self.path_d[0]} meters')
        else:
            pass

        return self.path_c, distance

    def keep_updated(self, currentx, currenty):
        current = (currentx, currenty)
        smallest = geodesic(self.path_c[0], current).meters
        smallest_index = 0
        for i in range(len(self.path_c)):
            if smallest < geodesic(self.path_c[i], current).meters:
                break
            else:
                smallest = geodesic(self.path_c[i], current).meters
                smallest_index = i
        distance = smallest + self.path_d[smallest_index]
        return distance

# reset if reached