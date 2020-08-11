console.log('fetching ports');
getPortsApi();
//check if local storage has data
//If true display data else load from API
if (localStorage.getItem('ports') != undefined) {
    console.log("Show data from local storage")
    showPorts(getPorts());
}
// else {
//     console.log("Load from API")
//     getPortsApi();
// }

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
            //save data to local storage
            localStorage.setItem('ports', JSON.stringify(data))
            showPorts(getPorts());

        } else {
            //show error
            // console.log("Error");
        }
    }
}

//display data on table
function showPorts(data) {
    var table = document.getElementById("ports_table");

    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = data[i].name;
        row.insertCell(1).innerHTML = data[i].country;
        row.insertCell(2).innerHTML = data[i].type;
        row.insertCell(3).innerHTML = data[i].size;
        row.insertCell(4).innerHTML = data[i].locprecision;
        row.insertCell(5).innerHTML = "(" + data[i].lat + "," + data[i].lng + ")";
    }
}


//get ports from local storage
function getPorts() {
    let data = JSON.parse(localStorage.getItem('ports'));
    return data;

}



