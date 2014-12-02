var querystring = require('querystring');
var http = require("http");
var url = require('url');

var vlccontrol = require('../index');

http.createServer(function (req, res) {
	console.log('**********************');    
    console.log(' ');
        
    console.log('server Start!');
    
    vlccontrol.init({ip:'192.168.1.7', port:8080, user:'', password:'asd123'});
    console.log('VLC Control init!');
	
	var pquery = querystring.parse(url.parse(req.url).query);
	var callback = (pquery.callback ? pquery.callback : '');
    console.log('receive request!');
	
	var msg = null;

	if ( callback === 'play' ) {
		vlccontrol.play();
		msg = { msg : " play " };
	}
	if ( callback === 'stop' ) {
		vlccontrol.stop();
		msg = { msg : " stop " };
	}
	if ( callback === 'forward' ) {
		vlccontrol.next();
		msg = { msg : " forward " };
	}
	if ( callback === 'backward' ) {
		vlccontrol.previous();
		msg = { msg : " backward " };
	}

	msg = JSON.stringify(msg);
    console.log('msg : ' + msg);
	
    res.writeHead(200, {'Content-Type': 'text/plain'});

    console.log('callback');
 	res.end(callback + '(\'' + msg + '\')');
 
}).listen(8124);