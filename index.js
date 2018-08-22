/*
 * A simple RESTful JSON API application which
 * answers only on /hello url with a simple greeting
 *
 * Author: Daniil "ElderMindseeker" Alexandrovich
 */

// Dependencies
const config = require('./config');
const httpsPems = require('./https_pems');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;


// Two servers: http and https using the same handler but different protocol
httpServer = http.createServer((req, res) => {
	serverHandler(req, res);
});

httpsServer = https.createServer(httpsPems, (req, res) => {
	serverHandler(req, res);
});


// Main server handler function
var serverHandler = (req, res) => {

	// That's all we need to dispatch a request
	var parsedUrl = url.parse(req.url, true);
	var urlPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
	var method = req.method.toUpperCase();

	// We'll also need a payload, but that's just for fun
	var decoder = new StringDecoder('utf-8');
	var buffer = '';

	req.on('data', data => {
		buffer += decoder.write(data);
	});

	// When we fully acquire payload the following sequence will be initiated
	req.on('end', () => {

		buffer += decoder.end();

		var chosenHandler = typeof(router[urlPath]) !== "undefined" ?
			router[urlPath] : handlers.notFound;

		// Data that will be given to the handler.
		// We need only payload and method
		var data = {
			'payload': buffer,
			'method': method
		};

		chosenHandler(data, (statusCode, payload) => {

			// Checking the validity of data and making default replacements
			// if needed
			statusCode = typeof(statusCode) == "number" ? statusCode : 200;
			payload = typeof(payload) == "object" ? payload : {};

			res.writeHead(statusCode, {
				'Content-Type': 'application/json'
			});

			res.end(JSON.stringify(payload));
		});
	});
};


// A whole routing system for just one /hello path seems redundant
// but that's just for the educational purposes
var handlers = {};

handlers.hello = (data, callback) => {

	// Accept only POST requests
	if (data['method'] !== "POST")
		callback(405);

	// Include client's payload and server's nice response in the answer
	var answer = {
		'client_said': data.payload,
		'server_said': "Hello!"
	};

	callback(200, answer);
};

handlers.notFound = (data, callback) => {
	callback(404);
};


var router = {
	'hello': handlers.hello
};


// Launch the servers
httpServer.listen(config.httpPort, () => {
	console.log(`HTTP server listening on port ${config.httpPort}`);
});

httpsServer.listen(config.httpsPort, () => {
	console.log(`HTTPS server listening on port ${config.httpsPort}`);
});