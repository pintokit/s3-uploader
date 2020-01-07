// require https module
const https = require('https');

function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    let body = "";

    response.on('data', data => {
      body += data.toString();
    });
    
    response.on('end', () => {
                const profile = JSON.parse(body);
                printMessage(username, profile.badges.length, profile.points.JavaScript); 
    });
  });

  request.on('error', error => console.error(`Problem with request: ${error.message}`));
}

// const users = ["chalkers", "alenaholligan", "davemcfarland"];
// `process` is a global object that allows access to arguments passed in to the command line
const users = process.argv.slice(2);

// users.forEach (username => {
//     getProfile(username);
// });

users.forEach(getProfile);