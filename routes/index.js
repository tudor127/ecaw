var express = require('express');
var mysql = require('../models/mysql');
var MediaContent = require('../models/MediaContentModel');
var router = express.Router();

let mediaContent = new MediaContent(mysql);

/* GET home page. */
router.get('/', function(req, res, next) {
    mediaContent.getCategories().then((results) => {
        res.render('index', { title: 'ECAW', categories: results });
    });
});

router.get('/category/:name', function(req, res, next) {
    mediaContent.getCategoryContent(req.params.name, req.query.page).catch(reason => {
        res.end("[]");
    }).then(value => {
        res.end(JSON.stringify(value));
    });
});

module.exports = router;
