var config = require('../config.json');
const passwordHash = require('password-hash');
var mysql = require('./mysql');

class UserModel {
    constructor() {
        this.mysqlConn = mysql;
    }

    checkUsername(username, callback) {
        var sql = "SELECT count(id) as res,passwd from users where username=? limit 1";
        this.mysqlConn.query(sql, [username], function (err, results) {
            if (err) {
                // throw err;
                return callback('error');
            }
            if (results[0].res > 0) {
                return callback(results[0].passwd);
            } else {
                return callback('none');
            }
        });
    }

    checkUser(username, password, callback) {
        this.checkUsername(username, function (result) {
            if (result == 'error') {
                return callback(-1);
            } else if (result == 'none') {
                return callback(-2);//incorrect username
            } else {
                if (passwordHash.verify(password, result)) {
                    return callback(1);//logged
                } else {
                    return callback(-3);//incorrect password
                }
            }
        });
    }

    registerUser(username, password, confirm_password, email, callback) {
        this.checkUsername(username, function (result) {
            if (result == 'error') {
                return callback(-1);//error
            } else if (result == 'none') {
                if (password === confirm_password) {
                    var sql = "insert into users(username,passwd,email,created_at,modified_at) values(?,?,?,now(),now())";
                    mysql.query(sql, [username, passwordHash.generate(password), email], function (err, results) {
                        if (err) {
                            return callback(-1);//error
                        } else {
                            return callback(1);//registered
                        }
                    });
                } else {
                    return callback(-3);//unconfirmed password
                }
            } else {
                return callback(-2);//username already exists
            }
        });
    }

}

module.exports = UserModel;

