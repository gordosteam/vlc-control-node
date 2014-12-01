/**
 * @author Fernando
 *
 */

var http = require("http");

var ipServer = '';
var portServer = 8080;
var user = '';
var password = '';

var vlcControl = module.exports = function(config) {

};

function getOptions(path) {
	return {
		host : ipServer,
		port : portServer,
		path : path,
		method : 'GET',
		auth: user + ':' + password,
		headers : {
			'Content-Type' : 'application/json'
		}
	};

}

function request(options) {
	var prot = http;
	var req = prot.request(options, function(res) {
		var output = '';

		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			console.log(chunk);
			output += chunk;
		});

		res.on('end', function() {
			try {
				console.log(output);
				return JSON.parse(output);
			} catch (err) {
				console.error(err.stack);
				console.error(options);
			}
		});
	   
	});
	req.on('error', function(err) {
		console.error(err.stack);
		console.error(options);
	});

	req.end();
};

(function() {
	this.init = function(options) {
		ipServer = options.ip;
		portServer = options.port;
		user = options.user;
		password = options.password;
	};
	this.addAndStart = function(uri, noaudio, novideo) {
		if (noaudio)
			var options = getOptions('/requests/status.json?command=in_play&input=' + uri + '&option=noaudio');
		else if (novideo)
			var options = getOptions('/requests/status.json?command=in_play&input=' + uri + '&option=novideo');
		else
			var options = getOptions('/requests/status.json?command=in_play&input=' + uri);
		console.log(request(options));
	};

	this.addToPlaylist = function(uri) {
		var options = getOptions("/requests/status.json?command=in_enqueue&input=" + uri);
		console.log(request(options));
	};

}).call(vlcControl);
