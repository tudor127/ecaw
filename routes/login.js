var express = require('express');
var router = express.Router();
var mysql = require('../models/mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var UserModel = require('../models/UserModel');
router.use(session({
	secret: '1234',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
router.use(express.urlencoded({extended : true}));
router.use(express.json());
router.post('/', function(req, res) {
	 var username=req.body.username;
	 var password=req.body.password;
	 var userModel = new UserModel(mysql);
     userModel.checkUser(username,password,function(result){
     	if(parseInt(result)==1){
     		req.session.loggedin = true;
			req.session.username =username;
   		  }

    	 res.send(''+result);

  	});

});

module.exports = router;
