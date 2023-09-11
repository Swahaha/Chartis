import React, { useState, useEffect } from 'react'

export default function GeoPath({path, handleOutput}) {
    console.log(path)
    const geojsonData = {
        "type": "FeatureCollection",
        "features": [
            //{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[-78.9410339434174,36.00158622799154],"type":"Point"}}]}
            {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-78.936635,35.999031],[-78.936347,35.998879],[-78.936421,35.998775],[-78.935695,35.998345],[-78.93556,35.998265],[-78.935541,35.998184],[-78.93565,35.998039],[-78.935715,35.998],[-78.935762,35.997983],[-78.936631,35.997889],[-78.936734,35.997906],[-78.936865,35.997947],[-78.937009,35.998005],[-78.937126,35.99806],[-78.937231,35.998123],[-78.937245,35.998131],[-78.937327,35.998193],[-78.937484,35.998325],[-78.937381,35.998473],[-78.936929,35.999119],[-78.936977,35.999143]]}}]}
        ]
      };
    handleOutput(geojsonData)

    return (
        <></>
    )
}

/* old code:

const geojsonData = {
    "type": "FeatureCollection",
    "features": [
        //{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[-78.9410339434174,36.00158622799154],"type":"Point"}}]}
        {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-78.936635,35.999031],[-78.936347,35.998879],[-78.936421,35.998775],[-78.935695,35.998345],[-78.93556,35.998265],[-78.935541,35.998184],[-78.93565,35.998039],[-78.935715,35.998],[-78.935762,35.997983],[-78.936631,35.997889],[-78.936734,35.997906],[-78.936865,35.997947],[-78.937009,35.998005],[-78.937126,35.99806],[-78.937231,35.998123],[-78.937245,35.998131],[-78.937327,35.998193],[-78.937484,35.998325],[-78.937381,35.998473],[-78.936929,35.999119],[-78.936977,35.999143]]}}]}
    ]
  };

export default geojsonData;

*/