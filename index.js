/*
 * A simple RESTful JSON API application which
 * answers only on /hello url with a simple greeting
 *
 * Author: Daniil "ElderMindseeker" Alexandrovich
 */

const server = require('./server');
const cluster = require('cluster');
const os = require('os');

// Execute only if run directly and not imported into other module
if (require.main === module) {
	if (cluster.isMaster) {
		// If we are in master thread, fork several other threads
		for (var i = 0; i < os.cpus().length; i++) {
			cluster.fork();
		}
	} else {
		// Otherwise, if we are in child thread, launch servers
		server.init();
	}
}