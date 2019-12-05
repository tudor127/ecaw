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

module.exports = mysql;
