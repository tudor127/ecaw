var express = require('express');
var mysql = require('../models/mysql');
var MediaContent = require('../models/MediaContentModel');
var UserModel = require('../models/UserModel');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');

let mediaContent = new MediaContent(mysql);

router.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.raw());
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
            faClass: "fas fa-pen",
            tooltip: "Pen",
            id: "pen"
        },{
			faClass: "fa fa-caret-up",
			tooltip: "Triangle",
			id: "triangle"
		}];

        let user = {'logged': log_var, 'name': user_name,'firstLetter':user_name.charAt(0).toUpperCase()};
        res.render('index', {title: 'ECAW', categories: results, user: user, toolbox});
    });
});

router.get('/category/:name', function (req, res, next) {
    mediaContent.getCategoryContent(req.params.name, req.query.page).catch(reason => {
        res.end('[]');
    }).then(value => {
        res.end(JSON.stringify(value));
    });
});

router.get('/user/:user/project/:project', function (req, res, next) {
    let userModel=new UserModel();
    userModel.getProject(req.params.user, req.params.project,function(result){
        if(result.length>0){
            res.render('project', {title: 'ECAW','project':result[0]});
        }
        else{
            console.log(result);
            res.header("Content-Type", "text/html");
            res.end('<h1>Project not found!</h1>');
        }    
    });
});

router.post('/save/:projectName', function (req, res, next) {
    let userModel = new UserModel();
    userModel.saveProject(req.session.username, req.params.projectName, req.body).then(value => {
        res.end(value);
    }).catch(reason => {
        res.status(400).end(reason);
    });
});

router.get('/projects', function (req, res, next) {
    let userModel = new UserModel();
    userModel.getProjects(req.session.username,function(results){
        res.header("Content-Type", "text/json");
        res.end(JSON.stringify(results));
    });

});
module.exports = router;
