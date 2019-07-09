const http = require('http');
const os = require('os');

var handler = function(request, response) {
  response.writeHead(200);
  text = `
  Ceci est la reponse d'un service 
  Ce service est heberge sur la machine nommee: ${os.hostname()}`
  response.end(text + "\n");
};

var www = http.createServer(handler);
www.listen(8080);