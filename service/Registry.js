/**
 * Registry
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */

var fs = require('fs')
  , services = {}

exports.Registry = Registry;

exports.getInstance = function (servicesFilename) {
    return new Registry(servicesFilename);
}

function Registry(servicesFilename) {
	loadServices(servicesFilename);
}

Registry.prototype.getService = function(destination) {
	var ret = {}
	var serviceName;
	// basic lookup by service name
	if(destination.service) {
		serviceName = destination.service
	}
	if(serviceName) {
		ret = services[serviceName]
	}
	return ret;
}

function loadServices(servicesFilename) {
	if(fs.existsSync(servicesFilename)) {
		services = JSON.parse(fs.readFileSync(servicesFilename));
		if(services) {
			console.info('Available Services:')
			for(serviceName in services) {
				console.log('  ' + serviceName + ' [endpoint: ' + services[serviceName].endpoint + ']')
				for(method in services[serviceName].services) {
					console.log('    ' + method + ' [ver: ' + services[serviceName].services[method].version + ', protocols: ' + services[serviceName].services[method].protocols + ']')
				}
			}
		}
	} else {
		console.warn('File not found: ' + servicesFilename)
		console.warn('No services available')
	}
}