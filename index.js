var config = require('./config.json')
  , httpd = require('./server/httpd')

httpd.start(config)