vlc-control-node
================

Module for Node. JS to control your VLC with a wrapper

[![NPM](https://nodei.co/npm/vlc-control-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/vlc-control-node/)

## Installation
```javascript
  npm install vlc-control-node --save
```

## Usage
**Note:** the module must be **installed** before use.

```javascript
var vlccontrol = require("vlc-control-node");

vlccontrol.init({ip:'localhost',port:8080,user:'',password:'asd123'});

vlccontrol.addToPlaylist(encodeURI("D:\\Outras\\2008 - Black Ice\\ACDC - Black Ice - 01 - Rock n Roll Train.mp3")); //add this music in a playlist

```  
## Tests

In the folder test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
* 0.0.2 Added functions empty,rate,aspectRatio,sort,random,loop,repeat,fullscreen,setVolume