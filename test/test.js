var vlccontrol = require('../index');
var http = require("http");

vlccontrol.init({ip:'192.168.1.103',port:8080,user:'',password:'asd123'});
//vlccontrol.addToPlaylist(encodeURI("D:\\Outras\\2008 - Black Ice\\ACDC - Black Ice - 01 - Rock n Roll Train.mp3"));
console.log(vlccontrol.delete(3));

/*var options = {
  hostname: '192.168.1.103',
  port: 8080,
  path: '/requests/status.json?command=in_play&input=D:%5COutras%5C2008 - Black Ice%5CACDC - Black Ice - 01 - Rock n Roll Train.mp3',
  auth: ':asd123', 
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();*/
