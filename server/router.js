/**
 * Router
 * Copyright(c) 2013 Netspedition Inc <ovi@netspedition.com>
 * MIT Licensed
 */

var protocol = require('../domain/Protocol')

module.exports = function(configHash) {
    config = configHash;
    return exports;
}

exports.index = function(req, res) {
	var data = { title: config.siteTitle };
	res.render('home', data);
}

exports.request = function(req, res) {
	var data = {};
	res.json(data);
}

exports.respond = function(req, res) {
	var data = {};
	res.json(data);
}
