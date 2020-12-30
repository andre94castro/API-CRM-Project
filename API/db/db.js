'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sawmCrm',
        dateStrings: true
    }
);

connection.connect(
    function(err) {
        if (err) throw err;
        console.log("connected");
    }
);

module.exports = connection;