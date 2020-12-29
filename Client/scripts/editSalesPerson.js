
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
            console.log('http://localhost:3000/salesPersons/' + queryString["id"])
            fetch('http://localhost:3000/salesPersons/' + queryString["id"])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // Work with JSON data here
                    console.log(typeof(data[0].dataNascimento))
                    //document.getElementById["inputNome"].value = data[0].nome;
                    
                    document.getElementById("inputNome").value = data[0].nome;
                    document.getElementById("inputApelido").value = data[0].apelido;
                    document.getElementById("inputDataNasc").value = data[0].dataNascimento;
                    document.getElementById("inputEmail").value = data[0].email;
                    document.getElementById("inputContato").value = data[0].contato;   
                    
                    

                })
                .catch(err => {
                    // Do something for an error here
                })
        }
    }; 


    const botaoDel = document.getElementById('delete');
             
    botaoDel.addEventListener("click", function (e) {
        
        fetch('http://localhost:3000/salesPersons/delete/' + queryString["id"], {
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
            apelido: document.getElementById("inputApelido").value,
            dataNasc: document.getElementById("inputDataNasc").value,
            email: document.getElementById("inputEmail").value,
            contato: document.getElementById("inputContato").value                               
        };
        
        sendSalesPerson(updateForm)
        location.reload();
        return false;
        }) 



//funcções
    sendSalesPerson = (body) => {
        
        fetch('http://localhost:3000/SalesPersons/updateSalesPerson', {
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

        function FormataStringData(data) {
            var dia  = data.split("/")[0];
            var mes  = data.split("/")[1];
            var ano  = data.split("/")[2];
          
            return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
            // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
          }
    

