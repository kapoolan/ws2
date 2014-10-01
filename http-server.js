var http = require('http');
var url  = require('url');

function textHandler(request, response) {
  console.log('received a request from ' + request.headers.host);
  console.log('resource requested: ' + request.url);
  
  response.writeHead(200, { 'Content-Type' : 'text/plain' });

  response.write('hello: ' + request.headers.host + '\n');
  response.write('  --> you requested ' + request.url);
  response.end();
}
/*
function jsonHandler(request, response) {
  response.writeHead(200, { 'Content-Type' : 'text/json' });

  var obj = {
    host: request.headers.host,
    url : request.url
  };

  json = JSON.stringify(obj);
  response.write(json);
  response.end();
}
*/
function csvHandler(request, response) {
  response.writeHead(200, { 'Content-Type' : 'text/csv' });

  var obj = {
    fname: Theresa,
    lname: Hansen,
    uid:1,
    phone:527-485-6060,
    address:373-Stoughton-Center-Ruth
  };

  json = JSON.stringify(obj);
  response.write(json);
  response.end();
}


if (process.argv.length < 3) {
  console.log('usage: node http-server.js [text|csv]');
  process.exit(1);
}

var handlerType = process.argv[2];
if (!(handlerType === 'text' || handlerType === 'csv')) {
  console.log('usage: node http-server.js [text|csv]');
  process.exit(1);  
}

var server = null;

switch (handlerType) {
  case 'text':
    server = http.createServer(textHandler);
    break;
 
  case 'csv':
    server = http.createServer(csvHandler);
    break;
  default:
    throw new Error('invalid handler type!');
}

server.listen(4000);
console.log('Server is listening!');
