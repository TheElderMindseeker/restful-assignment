#Hello RESTful JSON API

This application is a homework assignment for the pure Node.js course at pirple.thinkific.com

The application is a HTTP/HTTPS server that accepts requests on /hello url path and answers with a simple JSON greeting. The server accepts only POST requests on /hello.

##Configuration

Server can be launched in either `testing` or `production` environment with the corresponding string specified in NODE_ENV environment variable. Testing server runs on ports 5080/5443 for HTTP/HTTPS correspondingly. Production changes this to ports 80/443 which are standard ports for those protocols. The SSL certificate was generated via openssl lib and self-signed.