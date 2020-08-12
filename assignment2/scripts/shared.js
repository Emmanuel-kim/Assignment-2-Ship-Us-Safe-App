class Ship {
    constructor(name, maxSpeed, range, desc, cost, status) {
        this.name = name;
        this.maxSpeed = maxSpeed;
        this.range = range;
        this.desc = desc;
        this.cost = cost;
        this.status = status;

    }
}

class Port {
    constructor(name, country, type, size, lat, lng) {
        this.name = name;
        this.country = country;
        this.type = type;
        this.size = size;
        this.lat = lat;
        this.lng = lng;


    }
}


class Route {
    constructor(name, ship, sourcePort, destinationPort, distance, time, cost,
        startDate, wayPointList) {
        this.name = name;
        this.ship = ship;
        this.sourcePort = sourcePort;
        this.destinationPort = destinationPort;
        this.distance = distance;
        this.time = time;
        this.cost = cost;
        this.startDate = startDate;
        this.wayPointList = wayPointList;

    }
}

class ShipList {
    constructor(ships) {
        this.ships = ships;

    }
}

class PortList {
    constructor(ports) {
        this.ports = ports;

    }
}

class RouteList {
    constructor(route) {
        this.route = route;


    }
}