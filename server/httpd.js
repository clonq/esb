/**
 * HTTP Server
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */

var express = require('express')
  , http = require('http')
  , path = require('path')

exports.start = function(config) {
  var app = express();

  var router = require('./router')(config)

  app.configure(function() {
    app.set('views', config.jade_views);
    app.set('view engine', 'jade');
    app.set('view options', { layout: false });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, 'uploads') }));    
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(config.static_web));    
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', router.index);
  app.post('/request', router.request);
  app.post('/respond', router.respond);

  http.createServer(app).listen(config.bind.port, config.bind.host, function () {
    console.log("Enterprise Service Bus started on port " + config.bind.port);
  });

}
