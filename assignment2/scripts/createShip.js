
let ships = [];
function addShip() {

    // document.getElementById("createshipForm").submit();
    // (name, speed, range, description, cost,)
    s = new Ship(
        document.getElementById('shipname').value,
        document.getElementById('speed').value,
        document.getElementById('range').value,
        document.getElementById('description').value,
        document.getElementById('cost').value,
        'available'
    );

    // console.log('ships' + JSON.stringify(s));

    //push the object to the shipslist arrray
    ships.push(s);
    sList = new ShipList(ships);
    // clear the form for new values
    document.querySelector('form').reset();
    //get stored ports
    let data = JSON.parse(localStorage.getItem('ships'));
    //add the new port.
    data.push(s);
    console.log('ships' + JSON.stringify(data));
    //update local storage
    localStorage.setItem('ships', JSON.stringify(data));

    window.location.replace("../main/index.html");

    alert("Ship created successfully");
}




