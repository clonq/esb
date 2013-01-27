/**
 * Registry
 * Copyright(c) 2013 Netspedition Inc <ovi@netspedition.com>
 * MIT Licensed
 */
const SERVICES_FILENAME = './services.json'

var fs = require('fs')
  , services

exports.Registry = Registry;

exports.getInstance = function () {
    return new Registry();
}

function Registry() {
	loadServices();
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

function loadServices() {
	services = JSON.parse(fs.readFileSync(SERVICES_FILENAME));
}