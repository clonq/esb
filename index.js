var config = require('./config.json')
  , httpd = require('./server/httpd')

exports.start = function(config) {
	httpd.start(config)
}
