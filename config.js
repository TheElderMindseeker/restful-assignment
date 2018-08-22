/*
 * Configuration file for a RESTful hello application
 *
 * Author: Daniil "ElderMindseeker" Alexandrovich
 */

// Dictionary of configurations
// Available configuration keys:
// httpPort for (obviously) http port specification
// httpsPort for (aslo obviously) https port specification
const configuration = {};


// Testing configuration
configuration.testing = {
	'httpPort': 5080,
	'httpsPort': 5443
};


// Production configuration
configuration.production = {
	'httpPort': 80,
	'httpsPort': 443
}


// The configuration set up is expected to be in NODE_ENV variable
// The default is testing
var configurationChoice = typeof(process.env.NODE_ENV) == 'string' ?
	process.env.NODE_ENV : 'testing';


module.exports = typeof(configuration[configurationChoice]) == 'object' ?
	configuration[configurationChoice] : configuration.testing;