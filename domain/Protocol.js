/**
 * Protocol
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */

exports = module.exports = new Protocol;

exports.Protocol = Protocol;

function Protocol() {
}

Protocol.prototype.parse = function(request) {
	var ret = {}
	if(request) {
		if(request.protocol) {
			if(request.protocol.name) {
				if('SIMPLE' == request.protocol.name.toUpperCase()) {
					ret.destination = request.destination;
					ret.payload = request.payload;
				} else if('GZIP' == request.protocol.name.toUpperCase()) {
					ret.destination = request.destination;
					ret.payload = request.payload;
				}
			} else {
				// assume simple protocol
			}
		} else {
			// assume simple protocol ver 1.0
		}
	} else {
		// error
	}
	return ret;
}

