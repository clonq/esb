/**
 * Router
 * Copyright(c) 2013 Netspedition Inc
 * MIT Licensed
 */
var Protocol = require('../domain/Protocol')
  , executor = require('../service/Executor')
  , registry

module.exports = function(configHash) {
    config = configHash;
  	registry = require('../service/Registry').getInstance(config.services)
    return exports;
}

exports.index = function(req, res) {
	var data = { title: config.siteTitle };
	res.render('home', data);
}

exports.request = function(req, res) {
	var data = {};
	var protocol = Protocol.parse(req.body);
	var service = registry.getService(protocol.destination);
	executor.invoke(service, protocol, function(err, data) {
		var response = {}
		if(err) response = err
		if(data) response = data
		res.json(response);
	})
}



exports.respond = function(req, res) {
	var data = {};
	res.json(data);
}

