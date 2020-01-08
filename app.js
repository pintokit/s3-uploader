// require https module
const https = require('https');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}

function printMessage(username, badgeCount, point) {
  const message = `${username} has ${badgeCount} total badge(s) and ${point} in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode == 200) {
        let body = "";
  
        response.on('data', data => {
          body += data.toString();
        });
        
        response.on('end', () => {
          try {
            const profile = JSON.parse(body);
            printMessage(username, profile.badges.length, profile.points.JavaScript); 
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${response.statusCode})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
  
    request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    printError(error);
  }
}

// const users = ["chalkers", "alenaholligan", "davemcfarland"];
// `process` is a global object that allows access to arguments passed in to the command line
const users = process.argv.slice(2);

// users.forEach (username => {
//     getProfile(username);
// });

users.forEach(getProfile);