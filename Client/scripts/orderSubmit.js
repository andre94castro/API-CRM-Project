//Preencher combo Vendedor
let dropdown = document.getElementById('sel1');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Escolha o Vendedor';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'http://localhost:3000/salesPersons/SalesPersonName';

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function() {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    let option;
    for (let i = 0; i < data.length; i++) {
      option = document.createElement('option');
      option.text = data[i].nome + ' ' + data[i].apelido;
      option.value = data[i].id;
      dropdown.add(option);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request.send();

//

//Preencher combo Contacto
let dropdown2 = document.getElementById('sel2');
dropdown2.length = 0;

let defaultOption2 = document.createElement('option');
defaultOption2.text = 'Escolha o Contacto';

dropdown2.add(defaultOption2);
dropdown2.selectedIndex = 0;

const url2 = 'http://localhost:3000/contacts/ContactName';

const request2 = new XMLHttpRequest();
request2.open('GET', url2, true);

request2.onload = function() {
  if (request2.status === 200) {
    const data2 = JSON.parse(request2.responseText);
    console.log(data2)
    let option2;
    for (let i = 0; i < data2.length; i++) {
      option2 = document.createElement('option');
      option2.text = data2[i].nome;
      option2.value = data2[i].id;
      dropdown2.add(option2);
    }
   } else {
    // Reached the server, but it returned an error
  }   
}

request2.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};

request2.send();

//

const form = document.getElementById('orderSubmit');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const insertOrder = {
        idVend: document.getElementById("sel1").value,
        idCont: document.getElementById("sel2").value,
        qttCamisola: parseInt(document.getElementById("camisolaQtt").value),
        valorCamisola: 15 * parseInt(document.getElementById("camisolaQtt").value),
        qttSapatilhas: parseInt(document.getElementById("sapatilhasQtt").value),
        valorSapatilhas: 30 * parseInt(document.getElementById("sapatilhasQtt").value),
        qttTshirt: parseInt(document.getElementById("tshirtQtt").value),
        valorTshirt: 10 * parseInt(document.getElementById("tshirtQtt").value)
    }

    console.log(insertOrder)
    sendOrder = (body) => {
        fetch('http://localhost:3000/orders/newOrder', {
            method: 'POST',
            headers: {
                'Accept' :'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        }).then((res) => res.json())
        .then(function(data) {
            (console.log(data), data);
          })
        .then((body) =>  console.log(body))
        .catch((err)=>console.log(err))    
        }
        sendOrder(insertOrder);

    
});
