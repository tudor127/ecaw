var express = require('express');
var mysql = require('../models/mysql');
var MediaContentController = require('../controllers/MediaContentController');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
router.use(session({
	secret: '1234',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
    let mediaContentController = new MediaContentController(mysql);
    let categories = mediaContentController.getCategories();
    let log_var,user_name;
    if(req.session.loggedin){
    log_var=true;
    user_name=req.session.username;
}else {
log_var=false;
user_name='';

}
    res.render('index', { title: 'ECAW', categories: categories,logged:log_var,user_name:user_name});
});

module.exports = router;
