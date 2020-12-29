const form = document.getElementById('contactSubmit');
form.addEventListener('submit', function (e) {
e.preventDefault();

const insertForm = {
    nome: document.getElementById("inputNome").value, 
    cidade: document.getElementById("inputCidade").value,
    morada: document.getElementById("inputMorada").value,
    postal: document.getElementById("inputPostal").value,
    contato: document.getElementById("inputContato").value,
    contribuinte: document.getElementById("inputContribuinte").value,
    email: document.getElementById("inputEmail").value,
    website: document.getElementById("inputWebsite").value
};

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

sendContact = (body) => {
    fetch('http://localhost:8080/Hackthon/user/create', {
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
        if(data.email === false){
          criaErro('Email','Email por preencher ou inválido')
        };
        if(data.localidade === false){
          criaErro('Localidade','Falta preencher a Localidade')
        };
        if(data.morada === false){
          criaErro('Morada','Falta preencher a Morada')
        };
        if(data.postal === false){
          criaErro('Postal','Código Postal por preencher ou inválido')         
        };      
      })
    .then((body) =>  console.log(body))
    .catch((err)=>console.log(err))    
    }
    sendContact(insertForm);
    
});

