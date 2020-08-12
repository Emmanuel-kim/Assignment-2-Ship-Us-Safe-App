
console.log("fetching ships");

if (localStorage.getItem('ships') != undefined) {
    console.log("Show data from local storage")
    showShips(getShips());
} else {
    getshipsApi();
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
            localStorage.setItem('ships', JSON.stringify(data));


        } else {
            //show error
            // console.log("Error");
        }

    }
}


//display data on table
function showShips(data) {
    var table = document.getElementById("ships_table");

    for (let i = 0; i < data.length; i++) {
        var row = table.insertRow(i + 1);
        row.insertCell(0).innerHTML = data[i].name;
        row.insertCell(1).innerHTML = data[i].maxSpeed;
        row.insertCell(2).innerHTML = data[i].range;
        row.insertCell(3).innerHTML = data[i].desc;
        row.insertCell(4).innerHTML = data[i].cost;
        row.insertCell(5).innerHTML = data[i].status;
    }

}


//get ports from local storage
function getShips() {
    let data = JSON.parse(localStorage.getItem('ships'));
    return data;

}