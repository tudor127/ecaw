var config = require('../config.json');
var ms = require('mysql');
var mysql = ms.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    port: config.database.port
});

mysql.connect();

mysql.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0].solution)
});

module.exports(mysql);
