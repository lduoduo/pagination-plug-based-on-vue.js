var express = require('express');
var http = require('http');
var errorHandler = require('errorhandler');
var router_zh = require('./router_zh');


var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/',express.static('public'));
app.use('/me',router_zh);

app.use('/book/:id', function (req,res,next) {
	console.log('id:'+req.params.id);
	next();
});

if('development' == app.get('env')){
	app.use(errorHandler());
}


//除非需要直接使用 http 模块（socket.io/SPDY/HTTPS），否则不必加载它，可使用如下方式启动应用：
// var server = http.createServer(app);
// server.listen(app.get('port'),function(){
// 	console.log('express server on port:'+app.get('port'));
// });
// 
app.listen(app.get('port'), function(){
	console.log('express here: ' + app.get('port'));
});

