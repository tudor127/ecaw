var express = require('express');
var router = express.Router();
var mysql = require('../models/mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var UserController = require('../controllers/UserController');
router.use(session({
	secret: '1234',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
	 var username=req.query.username;
	 var password=req.query.password;
	 var userController = new UserController();

     userController.checkUser(username,password,function(result){
     if(parseInt(result)==1){
     	req.session.loggedin = true;
		req.session.username =username;
     }

     res.send(''+result);

  });

});

module.exports = router;
