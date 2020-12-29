 var queryString = new Array();
    window.onload = function () {
        if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        if (queryString["id"] != null) {
            fetch('http://localhost:3000/Contacts/' + queryString["id"])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // Work with JSON data here
                    // console.log(typeof(data[0].dataNascimento))
                    //document.getElementById["inputNome"].value = data[0].nome;
                    
                    document.getElementById("inputNome").value = data[0].nome;
                    document.getElementById("inputEmail").value = data[0].email;
                    document.getElementById("inputCidade").value = data[0].cidade;
                    document.getElementById("inputMorada").value = data[0].morada;
                    document.getElementById("inputPostal").value = data[0].postal;
                    document.getElementById("inputContribuinte").value = data[0].contribuinte;
                    document.getElementById("inputContato").value = data[0].contacto;
                    document.getElementById("inputWebsite").value = data[0].website;    

                })
                .catch(err => {
                    // Do something for an error here
                })
        }
    }; 


    const botaoDel = document.getElementById('delete');
             
    botaoDel.addEventListener("click", function (e) {
        
        fetch('http://localhost:3000/contacts/delete/' + queryString["id"], {
            method: 'DELETE',
          })
          .then(res => res.text()) // or res.json()
          .then(res => console.log(res))
        
    }) 

    const form = document.getElementById('salesPersonSubmit')

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const updateForm = {
            id: queryString["id"],
            nome: document.getElementById("inputNome").value, 
            cidade: document.getElementById("inputCidade").value,
            morada: document.getElementById("inputMorada").value,
            postal: document.getElementById("inputPostal").value,
            contato: document.getElementById("inputContato").value,
            contribuinte: document.getElementById("inputContribuinte").value,
            email: document.getElementById("inputEmail").value,
            website: document.getElementById("inputWebsite").value                              
        };
        
        sendSalesPerson(updateForm)
        location.reload();
        return false;
        }) 



//funções
    sendSalesPerson = (body) => {
        
        fetch('http://localhost:3000/Contacts/updateContact', {
            method: 'PUT',
            headers: {
                'Accept' :'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        }).then((res) => res.json())
        .then(function(data) {
            ('Request succeeded with JSON response', data);
            //Validação        
          })
        .then((body) =>  console.log(body))
        .catch((err)=>console.log(err))    
        };
