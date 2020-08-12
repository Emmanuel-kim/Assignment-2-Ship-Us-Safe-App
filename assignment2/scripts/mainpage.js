

if (localStorage.getItem('routes') != undefined) {
    console.log("Show data from local storage")
    showRoutes(getPorts());
}

//display data on table
function showRoutes(data) {
    var table = document.getElementById("routes_table");

    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = data[i].name;
        row.insertCell(1).innerHTML = data[i].ship.name;
        row.insertCell(2).innerHTML = data[i].sourcePort.name;
        row.insertCell(3).innerHTML = data[i].destinationPort.name;
        row.insertCell(4).innerHTML = data[i].distance;
        row.insertCell(5).innerHTML = data[i].time;
        row.insertCell(6).innerHTML = data[i].cost;
        row.insertCell(7).innerHTML = data[i].startDate;
    }
}


//get ports from local storage
function getRoutes() {
    let data = JSON.parse(localStorage.getItem('routes'));
    return data;

}
