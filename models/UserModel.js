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

    saveProject(username, projectName, body) {
        return new Promise(((resolve, reject) => {
            if (!username) {
                return reject(JSON.stringify({ 'error': 'You need to be logged in.' }));
            }

            let query = 'SELECT id FROM users WHERE username = ?';

            this.mysqlConn.query(query, [username], (error, result) => {
                if (error) {
                    return reject(JSON.stringify({ 'error': 'Database error.' }));
                }

                if (result.length === 0) {
                    return reject(JSON.stringify({ 'error': 'You need to be logged in.' }));
                }

                let userId = result[0].id;

                this._projectExists(userId, projectName).then(projectExists => {
                    if (projectExists) {
                        query = 'UPDATE creations SET content = ? WHERE user_id = ? AND project_name = ?';
                    } else {
                        query = 'INSERT INTO creations (content, user_id, project_name) VALUES (?, ?, ?)';
                    }

                    this.mysqlConn.query(query, [body, userId, projectName], (error, result) => {
                        if (error) {
                            return reject(JSON.stringify({ 'error': 'Database error.' }));
                        }

                        return resolve(JSON.stringify({'success': 'Project saved.'}));
                    });
                }).catch(reason => {
                    console.error(reason);
                    return reject(JSON.stringify({ 'error': 'An error occurred.' }))
                });
            });
        }));
    }

    _projectExists(userId, projectName) {
        return new Promise(((resolve, reject) => {
            if (userId === undefined || projectName === undefined || userId === '' || projectName === '') {
                throw new ReferenceError('Invalid params in projectExists method.' + userId + projectName);
            }

            let query = 'SELECT user_id FROM creations WHERE user_id = ? AND project_name = ?';

            this.mysqlConn.query(query, [userId, projectName], (error, result) => {
                if (error) {
                    throw new SQLException();
                }

                return resolve(result.length > 0);
            })
        }));
    }

  getProjects(username,callback){
        var sql = "SELECT project_name,CONVERT(content USING utf8) as content,users.username from creations join users on creations.user_id=users.id where users.username=?";
        this.mysqlConn.query(sql, [username], function (err, results) {
            if (err) {
                return callback('error');
            }
            return callback(results);
        });
  }

  getProject(username,project,callback){
        var sql = "SELECT project_name,CONVERT(content USING utf8) as content from creations join users on creations.user_id=users.id where users.username=? and project_name=?";
        this.mysqlConn.query(sql, [username.trim(),project.trim()], function (err, results) {
            if (err) {
                return callback('error');
            }
            return callback(results);
        });
  }
}

module.exports = UserModel;

