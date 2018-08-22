/*
 * Proxy for reading files with self-signed SSL certificate
 *
 * Author: Daniil "ElderMindseeker" Alexandrovich
 */

// Dependencies
const fs = require('fs');


// Object that will be exported
var keys = {};


// Read the files with keys
keys.key = fs.readFileSync('./https_pems/key.pem');
keys.cert = fs.readFileSync('./https_pems/cert.pem');


module.exports = keys;