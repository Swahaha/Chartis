import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import GeoPath from './map.geojson.js';
import { iconPerson, iconDestination, iconClicked, iconStair, iconPuddle, iconElevator, iconBuilding } from './icon';

const pathJson = {
  "type": "FeatureCollection",
  "features": [
      {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-78.936635,35.999031],[-78.936347,35.998879],[-78.936421,35.998775],[-78.935695,35.998345],[-78.93556,35.998265],[-78.935541,35.998184],[-78.93565,35.998039],[-78.935715,35.998],[-78.935762,35.997983],[-78.936631,35.997889],[-78.936734,35.997906],[-78.936865,35.997947],[-78.937009,35.998005],[-78.937126,35.99806],[-78.937231,35.998123],[-78.937245,35.998131],[-78.937327,35.998193],[-78.937484,35.998325],[-78.937381,35.998473],[-78.936929,35.999119],[-78.936977,35.999143]]}}]}
  ]
};

const buildings = {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "coordinates": [
            -78.935872,
            35.998884
            ],
            "type": "Point"
        }
        },
        {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "coordinates": [
            -78.939348,
            35.999196
            ],
            "type": "Point"
        }
        }
    ]

}


const elevators = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -78.93688824874882,
            35.999289307502224
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -78.94151094082889,
            35.99957111781366
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "coordinates": [
            -78.94071420749275,
            36.000823082786454
          ],
          "type": "Point"
        }
      }
    ]
  }

const puddles = 
    {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                -78.93806983825559,
                35.999333192126045
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                -78.9382653046235,
                35.999053628092526
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                -78.94049571550076,
                35.99951956759736
              ],
              "type": "Point"
            }
          },
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "coordinates": [
                -78.93922518410936,
                36.00030177500021
              ],
              "type": "Point"
            }
          }
        ]
      }


const baths = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.94084,
          35.999879
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.940729,
          36.000404
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.939969,
          36.000433
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.940488,
          36.000349
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.939577,
          36.00037
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.942512,
          35.997918
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.942415,
          35.998123
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.94136,
          35.999336
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.937661,
          36.001493
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.937111,
          36.000731
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.935441,
          35.99828
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.936769,
          35.999045
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.936726,
          36.00139
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.936381,
          36.002506
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.936787,
          36.0027
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.939112,
          36.00424
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.940539,
          36.003627
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.941309,
          36.003154
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.941541,
          36.003143
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.941527,
          36.003596
        ],
        "type": "Point"
      }
    }
  ]
}

function createPathJson(path) {
  const pathJsonTemplate = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": []  
            }
          }
        ]
      }
    ]
  };

  if (path && path.length > 0) {
    pathJsonTemplate.features[0].features[0].geometry.coordinates = path;
  }

  return pathJsonTemplate;
}

export default function Monkey({userIsAdding, closeUserIsAdding, clickedPosition, setClickedPosition}) {
  const pos = [36.0011902, -78.9392403];
  var result = [];
  const [path, setPath] = useState(null); // here
  const [pathDistance, setPathDistance] = useState(null); // here
  const [pathJsonData, setPathJsonData] = useState(pathJson);
  const [state, setState] = useState(Date.now())

  function LocationMarker({ setClickedPosition }) {
    const [position, setPosition] = useState({
        "lat": 36.00014141303757,
        "lng": -78.94070807211797
    });
    function sendDestToServer(data){
        fetch("/mammamia/chimp/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then((res) => res.json())
            .then((result) => {
              setPathJsonData(createPathJson(result[0]));
              console.log(pathJsonData)
            })
    }

    useEffect(() => {
        setState(Date.now())
    }, [pathJsonData]);
  
    const map = useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
        if(!userIsAdding){
          sendDestToServer({'lat': position.lat, 'lng': position.lng, 'lat2': e.latlng.lat,'lng2': e.latlng.lng});
        }
        else{
          console.log('POPUP');
        }
      },
    
      locationfound(e) {
        setPosition(e.latlng);
      }
    });
  
    useEffect(() => {
      map.locate();
      const locationInterval = setInterval(() => {
        map.locate();
      }, 1000); // 5000 milliseconds or 5 seconds
  
      return () => {
        clearInterval(locationInterval);
      };
    }, [map]);
  
    return position === null ? null : (
      <Marker position={position} icon={iconPerson} className='leaflet-marker'>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }
  
  const customIcon = new L.Icon({
    iconUrl: 'path/to/your/icon.png', // Specify the path to your icon
    iconSize: [25, 25],
  });

  function CustomGeoJSON() {
    const pointToLayer = (feature, latlng) => {
      return L.marker(latlng, { icon: iconPerson });
    };
  }

  const markerPosition = [35.998897, -78.937299]

  return (

    <div className='map-container' key={pathJsonData}>

      <MapContainer key={pathJsonData} center={pos} zoom={14} scrollWheelZoom={true} style={{ height: "100%", backgroundColor: "white", marginTop: "0px", marginBottom: '0px' }}>
      <span>
        <GeoJSON key={state}
            attribution="Paths"
            data={pathJsonData}
        /> 
      </span>

      <Marker 
        position={markerPosition} 
        icon = {iconBuilding}
        eventHandlers={{ 
          click: () => {
            alert('Marker clicked!');
          },
        }}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <GeoJSON
        attribution="baths"
        data={baths}
        pointToLayer={(feature, latlng) => {
            return L.marker(latlng, { icon: iconStair });
        }}
      /> 

      <GeoJSON
        attribution="puddles"
        data={puddles}
        pointToLayer={(feature, latlng) => {
            return L.marker(latlng, { icon: iconPuddle });
        }}
      /> 

      <GeoJSON
        attribution="elevators"
        data={elevators}
        pointToLayer={(feature, latlng) => {
            return L.marker(latlng, { icon: iconElevator });
        }}
      /> 

    <GeoJSON
        attribution="buildings"
        data={buildings}
        pointToLayer={(feature, latlng) => {
            return L.marker(latlng, { icon: iconBuilding });
        }}
      /> 

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker setClickedPosition={setClickedPosition} className='leaflet-marker'/>
        {clickedPosition && !userIsAdding &&
          <Marker position={clickedPosition} icon = {iconDestination} className='leaflet-marker dest-icon'>
          </Marker>
        }
        {clickedPosition && userIsAdding &&
          <Marker position={clickedPosition} icon = {iconClicked} className='leaflet-marker'>
          </Marker>
        }
      </MapContainer>
    </div>
  );

}