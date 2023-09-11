import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Polyline, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import GeoPath from './map.geojson.js';
import { iconPerson, iconDestination, iconClicked, iconStair } from './icon';
// import { dropdownIndicatorCSS } from 'react-select/dist/declarations/src/components/indicators.js';

const pathJson = {
  "type": "FeatureCollection",
  "features": [
      //{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[-78.9410339434174,36.00158622799154],"type":"Point"}}]}
      {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-78.936635,35.999031],[-78.936347,35.998879],[-78.936421,35.998775],[-78.935695,35.998345],[-78.93556,35.998265],[-78.935541,35.998184],[-78.93565,35.998039],[-78.935715,35.998],[-78.935762,35.997983],[-78.936631,35.997889],[-78.936734,35.997906],[-78.936865,35.997947],[-78.937009,35.998005],[-78.937126,35.99806],[-78.937231,35.998123],[-78.937245,35.998131],[-78.937327,35.998193],[-78.937484,35.998325],[-78.937381,35.998473],[-78.936929,35.999119],[-78.936977,35.999143]]}}]}
  ]
};

const path2Json = {
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
                      "coordinates": [
                          [
                              -78.939263,
                              36.001185
                          ],
                          [
                              -78.939026,
                              36.001074
                          ],
                          [
                              -78.938764,
                              36.000947
                          ],
                          [
                              -78.938743,
                              36.000984
                          ],
                          [
                              -78.938518,
                              36.001287
                          ],
                          [
                              -78.938486,
                              36.001321
                          ],
                          [
                              -78.938187,
                              36.001733
                          ],
                          [
                              -78.937843,
                              36.002213
                          ],
                          [
                              -78.937875,
                              36.002283
                          ],
                          [
                              -78.937998,
                              36.00255
                          ],
                          [
                              -78.938176,
                              36.002627
                          ],
                          [
                              -78.937895,
                              36.00304
                          ],
                          [
                              -78.937898,
                              36.003104
                          ],
                          [
                              -78.93791,
                              36.003142
                          ],
                          [
                              -78.93792,
                              36.003164
                          ],
                          [
                              -78.937931,
                              36.00318
                          ],
                          [
                              -78.93816,
                              36.003291
                          ],
                          [
                              -78.938369,
                              36.003578
                          ],
                          [
                              -78.938193,
                              36.00384
                          ],
                          [
                              -78.938258,
                              36.003851
                          ]
                      ]
                  }
              }
          ]
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


export default function MapComponent({userIsAdding, closeUserIsAdding, clickedPosition, setClickedPosition}) {
  const position = [36.0011902, -78.9392403];
  const [funny, setFunny] = useState({'lat': 36.0011902, 'lng': -78.9392403, 'lat2': 36.0011902,'lng2': -78.9392403});
  var result = []
  const [path, setPath] = useState(null); // here
  const [pathDistance, setPathDistance] = useState(null); // here
  const [pathJsonData, setPathJsonData] = useState(pathJson);
  const [state, setState] = useState(Date.now())

  const pointToLayer = (feature, latlng) => {
    // Here we are using iconPerson for all points. 
    // You can use different icons based on feature properties if necessary
    return L.marker(latlng, { icon: iconPerson });
  };

  function LocationMarker({ setClickedPosition }) {
    const [position, setPosition] = useState(null);

  
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
  
    const map = useMapEvents({
      click(e) {
        setClickedPosition(e.latlng);
        if(!userIsAdding){
          sendDestToServer({'lat': 36.0011902, 'lng': -78.9392403, 'lat2': e.latlng.lat,'lng2': e.latlng.lng});
        }
        else{
          console.log('POPUP');
        }
        //saveDataToServer({'lat': e.latlng.lat,'lng': e.latlng.lng,'type': 'elevator'})
      }, // getting location when click
  
      locationfound(e) {
        setPosition(e.latlng);
      },
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

  /*const [geoPathOutput, setGeoPathOutput] = useState(null); // Add this line to define a new state variable

  function handleGeoPathOutput(stuff){
    console.log('pltay');
    console.log(stuff);
    setGeoPathOutput(stuff);
  }*/

  /*const polyline = [
    [35.999747, -78.940831],
    [36.001293, -78.939491],
    [36.001702, -78.941614],
  ]*/

  const fillBlueOptions = { fillColor: 'blue' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  function CustomGeoJSON() {
    const pointToLayer = (feature, latlng) => {
      return L.marker(latlng, { icon: iconPerson });
    };}

  return (

    <div className='map-container' key={pathJsonData}>

      <MapContainer key={pathJsonData} center={position} zoom={14} scrollWheelZoom={true} style={{ height: "100%", backgroundColor: "white", marginTop: "0px", marginBottom: '0px' }}>
      <GeoJSON
        attribution="Paths"
        data={pathJsonData}
      /> 

      <GeoJSON
        attribution="baths"
        data={baths}
        pointToLayer={(feature, latlng) => {
          return L.marker(latlng, { icon: iconPerson });
        }}
      /> 

<Marker position={[51.505, -0.09]} icon={iconPerson} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Marker position={position} icon={}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        
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
  )

}
