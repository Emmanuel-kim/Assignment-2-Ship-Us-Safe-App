
let shipsList = [];// new ShipsList();;
let portsList = [];//new PortsList();

let ship = new Ship();
let origin = new Port();
let dest = new Port();

let distance = 0, time = 0, cost = 0;
let wayPointList = [];

document.getElementById("errorDiv").style.display = "none";
document.getElementById("addRouteBtn").style.display = "none";

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYW51ZWxrIiwiYSI6ImNrZGx1cWNyZTA2bWozM3FuNHFqZXhmcWkifQ.psvHYw-JHbA48L0W7_EygQ';


//get ships from local storage
if (localStorage.getItem('ports') != undefined) {
    let data = JSON.parse(localStorage.getItem('ports'));

    portsList = data;
    var originPort = document.getElementById("originPorts");
    var destPort = document.getElementById("destPorts");

    for (let i = 0; i < data.length; i++) {
        var el = document.createElement("option");
        el.text = data[i].name;
        el.value = i;
        originPort.add(el);
    }
    for (let i = 0; i < data.length; i++) {
        var el = document.createElement("option");
        el.text = data[i].name;
        el.value = i;
        destPort.add(el);
    }

} else {
    getPortsApi();
}

if (localStorage.getItem('ships') != undefined) {
    let data = JSON.parse(localStorage.getItem('ships'));
    shipsList = data;
    var select = document.getElementById("ships");
    for (let i = 0; i < data.length; i++) {
        var el = document.createElement("option");
        el.text = data[i].name;
        el.value = i;
        select.add(el);
    }
} else {
    getshipsApi();
}



function getPortsApi() {

    let url = "https://eng1003.monash/api/v1/ports/";
    let http = new XMLHttpRequest();

    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {

        // console.log("Status " + http.status + " State " + http.readyState);

        if (http.status == 200 && http.readyState == 4) {
            let response = http.responseText;
            let data = JSON.parse(response).ports;
            //save to local storage
            localStorage.setItem('ports', JSON.stringify(data));

            portsList = data;
            var originPort = document.getElementById("originPorts");
            var destPort = document.getElementById("destPorts");

            for (let i = 0; i < data.length; i++) {
                var el = document.createElement("option");
                el.text = data[i].name;
                el.value = i;
                originPort.add(el);
            }
            for (let i = 0; i < data.length; i++) {
                var el = document.createElement("option");
                el.text = data[i].name;
                el.value = i;
                destPort.add(el);
            }

        } else {
            //show error
            // console.log("Error");
        }
    }
}

function getshipsApi() {

    let url = "https://eng1003.monash/api/v1/ships/";
    let http = new XMLHttpRequest();

    http.open("get", url);
    http.send();
    http.onreadystatechange = function () {

        // console.log("Status " + http.status + " State " + http.readyState);

        if (http.status == 200 && http.readyState == 4) {
            // set data to table
            let response = http.responseText;

            let data = JSON.parse(response).ships;
            shipsList = data;
            var select = document.getElementById("ships");
            for (let i = 0; i < data.length; i++) {
                var el = document.createElement("option");
                el.text = data[i].name;
                el.value = i;
                select.add(el);
            }

        } else {
            //show error
            // console.log("Error");
        }

    }
}




function onShipSelected() {
    var i = document.getElementById("ships").value;

    //Change ship status to enroute on localstorage
    ship = new Ship(
        shipsList[i].name,
        shipsList[i].maxSpeed,
        shipsList[i].range,
        shipsList[i].desc,
        shipsList[i].cost,
        "en-route",
    );
    console.log("selected ship " + JSON.stringify(ship));
    document.getElementById("errorDiv").display = "none";

}
function onOriginSelected() {
    var i = document.getElementById("originPorts").value;
    origin = new Port(
        portsList[i].name,
        portsList[i].country,
        portsList[i].type,
        portsList[i].size,
        portsList[i].lat,
        portsList[i].lng

    );

    // console.log("selected originPort" + JSON.stringify(origin));

}
function onDestinationSelected() {
    var i = document.getElementById("destPorts").value;
    dest = new Port(
        portsList[i].name,
        portsList[i].country,
        portsList[i].type,
        portsList[i].size,
        portsList[i].lat,
        portsList[i].lng

    );

    if (origin.lat == undefined) {
        origin = new Port(
            portsList[0].name,
            portsList[0].country,
            portsList[0].type,
            portsList[0].size,
            portsList[0].lat,
            portsList[0].lng

        );
    }

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [dest.lng, dest.lat], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });

    var originMarker = new mapboxgl.Marker()
        .setLngLat([origin.lng, origin.lat])
        .addTo(map);



    var destMarker = new mapboxgl.Marker()
        .setLngLat([dest.lng, dest.lat])
        .addTo(map);

    let wayPointCoords = [];
    let wayPoint = [];

    wayPointCoords.push(origin);
    wayPointCoords.push(dest);

    // options.color .style.color = "#ff0000"
    map.on('click', function (e) {
        console.log("Map clicked " + JSON.stringify(e.lngLat.wrap()));
        //get distance between waypoint 

        let coordStr = '';
        //create coords list
        if (wayPointCoords.length > 0) {
            coordStr = wayPointCoords[wayPointCoords.length - 1].lat + "," + wayPointCoords[wayPointCoords.length - 1].lng + ";" +
                e.lngLat.wrap().lat + "," + e.lngLat.wrap().lng;
            let directionsUrl = "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/" + coordStr + "?access_token=pk.eyJ1IjoiZW1tYW51ZWxrIiwiYSI6ImNrZGx1cWNyZTA2bWozM3FuNHFqZXhmcWkifQ.psvHYw-JHbA48L0W7_EygQ";
            let http = new XMLHttpRequest();
            http.open("get", directionsUrl);
            http.send();
            http.onreadystatechange = function () {
                // console.log("Response " + http.status);
                if (http.status == 200 && http.readyState == 4) {

                    let directionResponse = JSON.parse(http.responseText);
                    console.log("Distance " + directionResponse.waypoints[0].distance / 1000);
                    if (directionResponse.waypoints[0].distance / 1000 > 100) {
                        wayPoint.push(directionResponse.waypoints[0]);
                        console.log("add way point " + JSON.stringify(directionResponse.waypoints[0].location[0]));
                        document.getElementById("error").innerHTML = "";

                        wayPointCoords.push(e.lngLat.wrap());
                        calculateDistance(map, origin, dest, wayPoint);
                        document.getElementById("errorDiv").style.display = "none";
                        document.getElementById("shiperror").innerHTML = "";
                        document.getElementById("error").innerHTML = "";

                        document.getElementById("addRouteBtn").style.display = "block";
                    } else {
                        document.getElementById("addRouteBtn").style.display = "block";
                        document.getElementById("error").innerHTML = "Way point is not within the range of 100Km";
                    }
                }
                else if (http.status == 422) {
                    document.getElementById("errorDiv").style.display = "block";
                    document.getElementById("shiperror").innerHTML = "There was an error obtaining distance.";

                }
            }

        }





        // When the map is clicked, add a new drop-off point
        // and update the `dropoffs-symbol` layer
        // newDropoff(map.unproject(e.point));
        // updateDropoffs(dropoffs);
    });

    // console.log("selected originPort" + JSON.stringify(origin));
    // console.log("selected destPort " + JSON.stringify(dest));

}

function calculateDistance(map, origin, dest, waypoints) {

    let latlngs = [];

    let coordStr = '';
    coordStr = coordStr + origin.lat + "," + origin.lng + ";";
    coordStr = coordStr + dest.lat + "," + dest.lng + ";";
    // latlngs.push([origin.lat, origin.lng]);
    // latlngs.push([dest.lat, dest.lng]);
    wayPointList = waypoints;

    if (waypoints.length > 0) {
        for (let i = 0; i < waypoints.length; i++) {
            if (i == waypoints.length - 1)
                coordStr = coordStr + waypoints[i].location[0] + "," + waypoints[i].location[1];
            else
                coordStr = coordStr + waypoints[i].location[0] + "," + waypoints[i].location[1] + ";";

            latlngs.push([waypoints[i].location[0], waypoints[i].location[1]]);
        }
    }

    console.log("cordinates " + coordStr);

    let directionsUrl = "https://api.mapbox.com/optimized-trips/v1/mapbox/driving/" + coordStr + "?access_token=pk.eyJ1IjoiZW1tYW51ZWxrIiwiYSI6ImNrZGx1cWNyZTA2bWozM3FuNHFqZXhmcWkifQ.psvHYw-JHbA48L0W7_EygQ";
    let http = new XMLHttpRequest();
    http.open("get", directionsUrl);
    http.send();
    http.onreadystatechange = function () {
        if (http.status == 200 && http.readyState == 4) {
            let directionResponse = JSON.parse(http.responseText);
            let dist = directionResponse.waypoints[0].distance / 1000 < 100;
            //compare ships range
            distance = dist;
            time = distance / ship.maxSpeed;
            cost = distance * ship.cost;

            if (ship.range < distance) {
                //notify user that the ship is not within range
                document.getElementById("errorDiv").style.display = "block";
                document.getElementById("shiperror").innerHTML = "The ship you selected is not within range. Please select another ship.";
                console.log("Ship out of range " + JSON.stringify(ship));
            } else {
                console.log("Ship within of range " + JSON.stringify(ship));
                document.getElementById("addRouteBtn").style.display = "block";

                console.log("LatLngs " + JSON.stringify(latlngs));

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

                // var polyline = new mapboxgl.polyline(latlngs, { color: 'red' }).addTo(map);
                // map.fitBounds(polyline.getBounds());
            }

        }
    }

}


function addRoute() {
    //get ship from localstorage
    console.log("Ship " + document.getElementById('ships').value);
    console.log("Origin " + document.getElementById('originPorts').value);
    console.log("Dest " + document.getElementById('destPorts').value);
    console.log("Date " + document.getElementById('date').value);
    console.log("Name " + document.getElementById('name').value);

    route = new Route(
        document.getElementById('name').value,
        ship == undefined ? shipsList[0] : ship,
        origin,
        dest, distance, time, cost,
        document.getElementById('date').value, wayPointList
    );


    let data = JSON.parse(localStorage.getItem('routes')) == null ? [] : JSON.parse(localStorage.getItem('routes'));
    //add the new port.
    console.log(JSON.stringify(route));
    data.push(route);

    //update local storage
    localStorage.setItem('routes', JSON.stringify(data));
    console.log("======================================");
    console.log(localStorage.getItem('routes'));

    window.location.replace("../main/index.html");
    alert("Route created successfully");




}