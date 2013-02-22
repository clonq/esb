/**
 * Executor
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */
var request = require('request')

const UNKNOWN_ERROR = 500
const SERVICE_NOT_AVAILABLE = 404

exports.invoke = function(service, protocol, cb) {
	var ret = {err: null, data: null}
 	var method = protocol.payload.method;
 	var params = protocol.payload.parameters;
 	var serviceRequestUrl = service.endpoint + '/' + method
 	var validParameterCounter = 0;
 	for(var i=0; i<params.length; i++) {
 		if(params[i].name && params[i].value) {
	 		serviceRequestUrl += (validParameterCounter==0)?'?':'&';
	 		serviceRequestUrl += params[i].name + '=' + params[i].value;
	 		validParameterCounter++ 
 		}
 	}
 // console.log('invoking [' + serviceRequestUrl + ']')
	request.get(serviceRequestUrl, function (error, response, body) {
		if(error) {
			ret.err = {msg:'unknown error'}
			if(body) {
				try {
					ret.err.msg = JSON.parse(body);
				} catch(e) {
					console.log('Executor: cannot parse response: ' + body)
				}
			} else {
				if(error.code == 'ECONNREFUSED') ret.err.code = SERVICE_NOT_AVAILABLE
			}
		} else {
			if (response.statusCode == 200) {
				ret.data = body;
			} else if (response.statusCode == 404) {
				ret.err = {code: SERVICE_NOT_AVAILABLE, msg: 'wrong address / method'}
	  		} else {
				ret.err = {code: UNKNOWN_ERROR, msg: 'unknown error'}
	  			try {
					ret.err.msg = JSON.parse(body)
		  			ret.err.code = response.statusCode
	  			} catch(e) {
	  				if(body) console.log(body.substring(0, 255) + '...')
	  				// ignore non-json response parsing errors
	  			}
	  		}
		}
		if(ret.err) console.log(ret.err)
		if(ret.data) console.log(ret.data)
  		cb(ret.err, ret.data);
	});
}
