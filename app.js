// file path is required but file extension is not
const profile = require(`./profile.js`)

const users = ["chalkers", "alenaholligan", "davemcfarland"];
// `process` is a global object that allows access to arguments passed in to the command line
// const users = process.argv.slice(2);

// users.forEach (username => {
//     getProfile(username);
// });

users.forEach(profile.get);