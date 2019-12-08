var express = require('express');
var mysql = require('../models/mysql');
var MediaContentController = require('../controllers/MediaContentController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //let mediaContentController = new MediaContentController(mysql);
    //let categories = mediaContentController.getCategories();
    res.render('index', { title: 'ECAW', categories: categories });
});

module.exports = router;
