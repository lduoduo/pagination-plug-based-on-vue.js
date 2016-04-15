var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next){
	console.log('time: '+ Date.now());
	next();
});

router.get('/contact', function(req, res){
	res.send('contact me');
});

router.get('/about', function(req, res){
	res.send('about me');
});

module.exports = router;