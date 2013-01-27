var httpd = require('./server/httpd')

exports.start = function(config) {
	httpd.start(config)
}
