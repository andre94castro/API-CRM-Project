fetch('http://localhost:3000/contacts/')
.then(response => response.json())
.then(data => {; // Let supposed  the data is in this format [{ id: 1 }, { id: 2 }, { id: 3 }]
    console.log(data)
    output = document.getElementById('tabela')
    output.innerHTML = json2Table(data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error))

function json2Table(json) {
    let cols = Object.keys(json[0]);
  
  
    //Map over columns, make headers,join into string
    let headerRow = cols
      .map(col => `<th>${col}</th>`)
      .join("");
  
    //map over array of json objs, for each row(obj) map over column values,
    //and return a td with the value of that object for its column
    //take that array of tds and join them
    //then return a row of the tds
    //finally join all the rows together
    let rows = json
      .map(row => {
        let tds = cols.map(col => `<td><a href="http://127.0.0.1:5500/Client/contact.html?id=${row.id}">${row[col]}</a></td>`).join("");
        return `<tr>${tds}</tr>`;
      })
      .join("");
  
    //build the table
    const table = `
      <table class="table table-striped table-sm">
          <thead>
              <tr>${headerRow}</tr>
          <thead>
          <tbody>
              ${rows}
          <tbody>
      <table>`;
  
    return table;
  }
  
