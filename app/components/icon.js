import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: 'images/ellipse-3.png',
    iconRetinaUrl: 'images/ellipse-3.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-div-icon'
});

const iconDestination = new L.Icon({
    iconUrl: 'images/red-marker-bright.png',
    iconRetinaUrl: 'images/red-marker-bright.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 40),
    className: 'leaflet-div-icon'
});

const iconStair = new L.Icon({
    iconUrl: 'images/no_red.png',
    iconRetinaUrl: 'images/no_red.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});

const iconClicked = new L.Icon({
    iconUrl: 'images/red-ellipse.png',
    iconRetinaUrl: 'images/red-ellipse.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(45, 45),
    className: 'leaflet-div-icon'
});

const iconPuddle = new L.Icon({
    iconUrl: 'images/puddle.png',
    iconRetinaUrl: 'images/puddle.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(15, 15),
    className: 'leaflet-div-icon'
});

const iconElevator = new L.Icon({
    iconUrl: 'images/elevator.png',
    iconRetinaUrl: 'images/elevator.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25),
    className: 'leaflet-div-icon'
});

const iconBuilding = new L.Icon({
    iconUrl: 'images/building.png',
    iconRetinaUrl: 'images/building.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25),
    className: 'leaflet-div-icon'
});

export { iconPerson, iconDestination, iconClicked, iconStair, iconPuddle, iconElevator, iconBuilding };