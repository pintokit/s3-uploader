// file path is required but file extension is not
const profile = require(`./profile.js`)

const users = ["chalkers", "alenaholligan", "davemcfarland"];
// `process` is a global object that allows access to arguments passed in to the command line
// const users = process.argv.slice(2);

// users.forEach (username => {
//     getProfile(username);
// });

users.forEach(profile.get);

const https = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

https.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(port, hostname, function() {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});