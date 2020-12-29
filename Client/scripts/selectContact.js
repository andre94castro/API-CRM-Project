document.getElementById("inputNome").readOnly = true;
document.getElementById("inputEmail").readOnly = true;
document.getElementById("inputCidade").readOnly = true;
document.getElementById("inputMorada").readOnly = true;
document.getElementById("inputPostal").readOnly = true;
document.getElementById("inputContribuinte").readOnly = true;
document.getElementById("inputContato").readOnly = true;
document.getElementById("inputWebsite").readOnly = true;
 
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
            fetch('http://localhost:3000/contacts/' + queryString["id"])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    // Work with JSON data here
                    console.log(data[0])
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

                const botaoEdit = document.getElementById('edit');

                if (queryString["id"] != null) {
                    fetch('http://localhost:3000/orders/' + queryString["id"])
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)

                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                    responsive:true,
                    type: 'bar',
                    data: {
                        labels: ['Camisolas', 'Tshirts', 'Sapatilhas'],
                        datasets: [{
                            label: 'Valor de artigos vendidos(€)',
                            data: [data[0].tValorCamisola, data[0].tValorTshirt, data[0].tValorSapatilhas],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                var ctx2 = document.getElementById('myChart2').getContext('2d');
                    var myChart = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        responsive:true,
                        labels: ['Camisolas', 'Tshirts', 'Sapatilhas'],
                        datasets: [{
                            label: 'quantidade de artigos vendidos(€)',
                            data: [data[0].tQttCamisola, data[0].tQttTshirt, data[0].tQttSapatilhas],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                    
                    

                })
                .catch(err => {
                    // Do something for an error here
                })
                    botaoEdit.addEventListener("click", function (e) {
                        
                        window.location.href = "http://127.0.0.1:5500/Client/contactEdit.html?id=" + queryString["id"] ;
                        
                    }) 
                }
        }
    }; 

    const botaoDel = document.getElementById('delete');
             
    botaoDel.addEventListener("click", function (e) {
        console.log('http://localhost:3000/contacts/delete/' + queryString["id"])
        fetch('http://localhost:3000/contacts/delete/' + queryString["id"], {
            method: 'DELETE',
          })
          .then(res => res.text()) // or res.json()
          .then(res => console.log(res))
        
    }) 
