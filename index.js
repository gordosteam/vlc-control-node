/**
 * @author Fernando
 *
 */

var http = require("http");

var ipServer = '';
var portServer = 8080;
var user = '';
var password = '';
var net = require('net');

var vlcControl = module.exports = function(config) {

};

function getOptions(path) {
	if (path) {
		return {
			host : ipServer,
			port : portServer,
			path : '/requests/status.json?command=' + path,
			method : 'GET',
			auth : user + ':' + password,
			headers : {
				'Content-Type' : 'application/json'
			}
		};
	} else {
		return {
			host : ipServer,
			port : portServer,
			path : '/requests/status.json',
			method : 'GET',
			auth : user + ':' + password,
			headers : {
				'Content-Type' : 'application/json'
			}
		};

	}
}

function sendResponse(msg) {
	var client = net.connect({
		port : 8124
	}, function() {//'connect' listener
		//console.log('client connected');
		client.write(msg.toString());
	});
	client.on('data', function(data) {
		//console.log(data.toString());
		client.end();
	});
	client.on('end', function() {
		//console.log('client disconnected');
	});
	//console.log("success!");
};

function request(options) {
	var prot = http;
	var req = prot.request(options, function(res) {
		var output = '';

		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			//console.log(chunk);
			output += chunk;
		});

		res.on('end', function() {
			try {
				//console.log(output);
				sendResponse(output);
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
		setInterval(function() {
			var options = getOptions();
			request(options);
		}, 500);
	};
	this.addAndStart = function(uri, noaudio, novideo) {
		if (noaudio)
			var options = getOptions('in_play&input=' + uri + '&option=noaudio');
		else if (novideo)
			var options = getOptions('in_play&input=' + uri + '&option=novideo');
		else
			var options = getOptions('in_play&input=' + uri);
		request(options);
	};

	this.addToPlaylist = function(uri) {
		var options = getOptions("in_enqueue&input=" + uri);
		request(options);
	};

	this.play = function(id) {
		if (id)
			var options = getOptions('pl_play&id=' + id);
		else
			var options = getOptions('pl_play');
		request(options);
	};

	this.pause = function(id) {
		if (id)
			var options = getOptions('pl_pause&id=' + id);
		else
			var options = getOptions('pl_pause');
		request(options);
	};

	this.forceResume = function() {
		var options = getOptions('pl_forceresume');
		request(options);
	};

	this.forcePause = function() {
		var options = getOptions('pl_forcepause');
		request(options);
	};

	this.stop = function() {
		var options = getOptions('pl_stop');
		request(options);
	};

	this.next = function() {
		var options = getOptions('pl_next');
		request(options);
	};

	this.previous = function() {
		var options = getOptions('pl_previous');
		request(options);
	};

	this.delete = function(id) {
		var options = getOptions('pl_delete&id=' + id);
		request(options);
	};

	this.empty = function() {
		var options = getOptions('pl_empty');
		request(options);
	};

	this.rate = function(rate) {
		var options = getOptions('rate&val=' + rate);
		request(options);
	};

	this.aspectRatio = function(ar) {
		var options = getOptions('aspectratio&val=' + ar);
		request(options);
	};

	this.sort = function(id, val) {
		var options = getOptions('pl_sort&id=' + id + '&val=' + val);
		request(options);
	};

	this.random = function() {
		var options = getOptions('pl_random');
		request(options);
	};

	this.loop = function() {
		var options = getOptions('pl_loop');
		request(options);
	};

	this.repeat = function() {
		var options = getOptions('pl_repeat');
		request(options);
	};

	this.fullscreen = function() {
		var options = getOptions('fullscreen');
		request(options);
	};

	this.setVolume = function(val) {
		var options = getOptions('volume&val=' + val);
		request(options);
	};

}).call(vlcControl);
