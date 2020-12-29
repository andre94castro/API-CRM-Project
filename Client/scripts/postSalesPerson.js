const form = document.getElementById('salesPersonSubmit');
form.addEventListener('submit', function (e) {
e.preventDefault();

const insertForm = {
    nome: document.getElementById("inputNome").value, 
    apelido: document.getElementById("inputApelido").value,
    dataNasc: document.getElementById("inputDataNasc").value,
    email: document.getElementById("inputEmail").value,
    contato: document.getElementById("inputCliente").value
};

//Converter para data

function FormataStringData(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}


console.log(FormataStringData(insertForm.dataNasc));

criaErro = (campo, texto) => {
  const alerta = document.querySelector('#alerta');
  const divAlerta = document.getElementById("mainBody");
  const botao = document.querySelector('#botaoFecha');

  const novoAlerta = alerta.cloneNode(true);
  novoAlerta.id = 'alerta' + campo;
  novoAlerta.innerHTML = texto;
  novoAlerta.appendChild(botao);
  divAlerta.prepend(novoAlerta);
  document.getElementById("alerta" + campo).style.display = "block";
}

sendSalesPerson = (body) => {
    fetch('http://localhost:3000/SalesPersons/newSalesPerson', {
        method: 'POST',
        headers: {
            'Accept' :'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(body)
    }).then((res) => res.json())
    .then(function(data) {
        ('Request succeeded with JSON response', data);
        //Validação        
        if(data.nome === false){
          criaErro('Nome','Falta preencher o nome')
        };
        if(data.apelido === false){
          criaErro('Apelido','Falta preencher o apelido')
        };
        if(data.dataNasc === false){
          criaErro('DataNasc','Falta preencher a data de nascimento')
        };
        if(data.email === false){
          criaErro('Email','Email por preencher ou invalido')
        };
        if(data.contato === false){
          criaErro('Contato','Falta preencher o contato')
        };
      })
    .then((body) =>  console.log(body))
    .catch((err)=>console.log(err))    
    }
    sendSalesPerson(insertForm);

});

