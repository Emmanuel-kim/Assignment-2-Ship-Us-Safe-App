let ports = [];
let portLocation;


function addPort() {

    //get location from OpenCage Api


    if (portLocation == undefined) {
        //Return error to the page
        console.log("No location found");
        return;
    }
    p = new Port(document.getElementById('name').value,
        document.getElementById('country').value,
        document.getElementById('type').value,
        document.getElementById('size').value,
        // data.formatted,
        data.geometry.lat,//this should be lat
        data.geometry.lng,//this should lng
    );

    ports.push(p);
    pList = new PortList(ports);
    // clear the form for new values
    // document.querySelector('form').reset();

    //get stored ports
    let data = JSON.parse(localStorage.getItem('ports'));
    //add the new port.
    data.push(p);
    //update local storage
    localStorage.setItem('portsList', JSON.stringify(data));

}


function getLocation() {
    //validate form here


    let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + document.getElementById('location').value + '&key=c8a69f804bba4d16afd60354214ae8d8&language=en&pretty=1';
    let http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function () {

        if (http.status == 200 && http.readyState == 4) {
            let response = http.responseText;
            let data = JSON.parse(response).results[0];
            //save data to local storage
            console.log(">> " + data.formatted);
            console.log(">> " + data.geometry.lat);
            console.log(">> " + data.geometry.lng);
            portLocation = data;
            addPort();
        } else {
            //show error
            // console.log("Error");
        }

        document.getElementById("savebtn").onclick = function(){
            location.href = '../main/index.html';
        }
    }

   
    

    console.log("Location found " + JSON.stringify(portLocation));
}


