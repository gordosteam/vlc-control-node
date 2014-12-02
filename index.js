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
		path : '/requests/status.json?command='+ path,
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
			//console.log(chunk);
			output += chunk;
		});

		res.on('end', function() {
			try {
				//console.log(output);
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
			var options = getOptions('in_play&input=' + uri + '&option=noaudio');
		else if (novideo)
			var options = getOptions('in_play&input=' + uri + '&option=novideo');
		else
			var options = getOptions('in_play&input=' + uri);
		return request(options);
	};

	this.addToPlaylist = function(uri) {
		var options = getOptions("in_enqueue&input=" + uri);
		return request(options);
	};

	this.play = function(id) {
		if (id)
		  var options = getOptions('pl_play&id=' + id);
		else
		  var options = getOptions('pl_play');
		return request(options);
	};

	this.pause = function(id) {
		if (id)
		  var options = getOptions('pl_pause&id=' + id);
		else
		  var options = getOptions('pl_pause');
		return request(options);
	};

	this.forceResume = function() {
		var options = getOptions('pl_forceresume');
		return request(options);
	};

	this.forcePause = function() {
		var options = getOptions('pl_forcepause');
		return request(options);
	};

	this.stop = function() {
		var options = getOptions('pl_stop');
		return request(options);
	};

	this.next = function() {
		var options = getOptions('pl_next');
		return request(options);
	};

	this.previous = function() {
		var options = getOptions('pl_previous');
		return request(options);
	};

	this.delete = function(id) {
		var options = getOptions('pl_delete&id=' + id);
		return request(options);
	};
	
	this.empty = function() {
		var options = getOptions('pl_empty');
		return request(options);
	};
	
	this.rate = function(rate) {
		var options = getOptions('rate&val=' + rate);
		return request(options);
	};
	
	this.aspectRatio = function(ar) {
		var options = getOptions('aspectratio&val=' + ar);
		return request(options);
	};
	
	this.sort = function(id,val) {
		var options = getOptions('pl_sort&id='+ id + '&val=' + val);
		return request(options);
	};
	
	this.random = function() {
		var options = getOptions('pl_random');
		return request(options);
	};
	
	this.loop = function() {
		var options = getOptions('pl_loop');
		return request(options);
	};
	
	this.repeat = function() {
		var options = getOptions('pl_repeat');
		return request(options);
	};
	
	this.fullscreen = function() {
		var options = getOptions('fullscreen');
		return request(options);
	};
	
	this.setVolume = function(val) {
		var options = getOptions('volume&val='+val);
	    return request(options); 
	};

}).call(vlcControl);
