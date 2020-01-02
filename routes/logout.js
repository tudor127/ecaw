var express = require('express');
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
router.get('/',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.send('logged out');
    });

});

module.exports = router;
