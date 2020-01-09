var express = require('express');
var mysql = require('../models/mysql');
var MediaContent = require('../models/MediaContentModel');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

let mediaContent = new MediaContent(mysql);

router.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res, next) {
    mediaContent.getCategories().then((results) => {
        let log_var, user_name;
        if (req.session.loggedin) {
            log_var = true;
            user_name = req.session.username;
        } else {
            log_var = false;
            user_name = '';
        }

		var toolbox = [{
			faClass: "fa fa-mouse-pointer",
			tooltip: "Move",
			id: "move"
		},{
            faClass: "far fa-trash-alt",
            tooltip: "Delete",
            id: "delete"
        },{
            faClass: "fas fa-draw-polygon",
            tooltip: "Polygon",
            id: "polygon"
        },{
			faClass: "far fa-square",
			tooltip: "Square",
			id: "square"
		},{
			faClass: "far fa-circle",
			tooltip: "Circle",
			id: "circle"
		},{
			faClass: "fa fa-caret-up",
			tooltip: "Triangle",
			id: "triangle"
		}];

                var projects = [{
            name: "Project1",
        },{
            name: "Project2",
        },{
            name: "Project3",
        },{
            name: "Project4",
        },{
            name: "Project5",
        },{
            name: "Project6",
        },{
            name: "Project1",
        },{
            name: "Project2",
        },{
            name: "Project3",
        },{
            name: "Project4",
        },{
            name: "Project5",
        },{
            name: "Project6",
        },{
            name: "Project1",
        },{
            name: "Project2",
        },{
            name: "Project3",
        },{
            name: "Project4",
        },{
            name: "Project5",
        },{
            name: "Project6",
        },];

        let user = {'logged': log_var, 'name': user_name};
        res.render('index', {title: 'ECAW', categories: results, user: user, toolbox,projects});
    });
});

router.get('/category/:name', function (req, res, next) {
    mediaContent.getCategoryContent(req.params.name, req.query.page).catch(reason => {
        res.end("[]");
    }).then(value => {
        res.end(JSON.stringify(value));
    });
});

module.exports = router;
