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
    let log_var;
    if(req.session.loggedin){
    log_var=true;
}else {
log_var=false;
}
    res.render('index', { title: 'ECAW', categories: categories,logged:log_var});
});

module.exports = router;
