document.getElementById("inputNome").readOnly = true;
document.getElementById("inputApelido").readOnly = true;
document.getElementById("inputDataNasc").readOnly = true;
document.getElementById("inputEmail").readOnly = true;
document.getElementById("inputContato").readOnly = true;
 
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
            fetch('http://localhost:3000/salesPersons/' + queryString["id"])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // Work with JSON data here
                    console.log(data[0])
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

                const botaoEdit = document.getElementById('edit');

                if (queryString["id"] != null) {
                    botaoEdit.addEventListener("click", function (e) {
                        
                        window.location.href = "http://127.0.0.1:5500/Client/salesPersonEdit.html?id=" + queryString["id"] ;
                        
                    }) 
                }
        }
    }; 
    

    const botaoDel = document.getElementById('delete');
             
    botaoDel.addEventListener("click", function (e) {
        console.log('http://localhost:3000/salesPersons/delete/' + queryString["id"])
        fetch('http://localhost:3000/salesPersons/delete/' + queryString["id"], {
            method: 'DELETE',
          })
          .then(res => res.text()) // or res.json()
          .then(res => console.log(res))
        
    }) 

