mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW51ZWxrIiwiYSI6ImNrZGx1cWNyZTA2bWozM3FuNHFqZXhmcWkifQ.psvHYw-JHbA48L0W7_EygQ';


let selectedId = localStorage.getItem('selectedRoute');
console.log(selectedId);
let data = JSON.parse(localStorage.getItem('routes'));

let route = data[selectedId];

console.log("selected router " + JSON.stringify(route));

document.getElementById("name").innerHTML = 'Name: <strong>' + route.name + '</strong>';
document.getElementById("ship").innerHTML = 'Ship: <strong>' + route.ship.name + '</strong>';
document.getElementById("origin").innerHTML = 'Source: <strong>' + route.sourcePort.name + '</strong>';
document.getElementById("destination").innerHTML = 'Destination: <strong>' + route.destinationPort.name + '</strong>';
document.getElementById("date").innerHTML = 'Date: <strong>' + route.startDate + '</strong>';

document.getElementById("distance").innerHTML = 'Distance: <strong>' + route.distance + '</strong>';
document.getElementById("cost").innerHTML = 'Cost: <strong>' + route.cost + '</strong>';
document.getElementById("time").innerHTML = 'Time: <strong>' + route.time + '</strong>';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [route.sourcePort.lng, route.sourcePort.lat], // starting position [lng, lat]
    zoom: 6 // starting zoom
});

var originMarker = new mapboxgl.Marker()
    .setLngLat([route.sourcePort.lng, route.sourcePort.lat])
    .addTo(map);



var destMarker = new mapboxgl.Marker()
    .setLngLat([route.destinationPort.lng, route.destinationPort.lat])
    .addTo(map);

let latlngs = [];
if (route.wayPointList.length > 0) {
    for (let i = 0; i < route.wayPointList.length; i++) {
        latlngs.push([route.wayPointList[i].location[0], route.wayPointList[i].location[1]]);
    }
}

console.log("Latlng " + JSON.stringify(latlngs));


map.addSource('route', {
    'type': 'geojson',
    'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString',
            'coordinates': latlngs
        }
    }
});
if (map.getLayer("route"))
    map.removeLayer("route");

map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
        'line-join': 'round',
        'line-cap': 'round'
    },
    'paint': {
        'line-color': '#FFA500',
        'line-width': 8
    }
});

