/**
 * Executor
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */
var request = require('request')

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
//	console.log('invoking [' + serviceRequestUrl + ']')
	request.get(serviceRequestUrl, function (error, response, body) {
		if(error) {
			if(body) ret.err = JSON.parse(body);
			else ret.err = 'unknown error'; 
		} else {
			if (response.statusCode == 200) {
				ret.data = body;
			} else if (response.statusCode == 404) {
				ret.err = {msg: 'wrong address / method'}
	  		} else {
				ret.err = {err: 'unknown error'}
	  			try {
					ret.err = JSON.parse(body)
		  			ret.err.code = response.statusCode
	  			} catch(e) {
	  				if(body) console.log(body.substring(0, 255) + '...')
	  				// ignore non-json response parsing errors
	  			}
	  		}
		}
  		cb(ret.err, ret.data);
	});
}
