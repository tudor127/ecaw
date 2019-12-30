var config = require('../config.json');
const passwordHash = require('password-hash');
var mysql = require('mysql');
var htmlspecialchars = require('htmlspecialchars');

var con = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
});

class UserController {

 checkUsername(username,callback){
      username=htmlspecialchars(username);
      var sql = "SELECT count(id) as res,passwd from users where username='"+username+"' limit 1";
      con.query(sql, function(err, results){
            if (err){ 
              // throw err;
              return callback('error');
            }
            if(results[0].res>0){
            return callback(results[0].passwd);
            }
            else{
            return callback('none');
            }
    });
}

 checkUser(username,password,callback){
         this.checkUsername(username,function(result){
     if(result=='error'){
      return callback(-1);
     }
     else if(result=='none'){
      return callback(0);
     }
     else {      
      password=htmlspecialchars(password);      
      if(passwordHash.verify(password,result)){
      return callback(1);
    }
    else{
      return callback(0);
    }
     }
  });
}
}

module.exports = UserController;

