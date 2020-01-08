require('dotenv').config()
// // file path is required but file extension is not
// const profile = require(`./profile.js`)

// const users = ["chalkers", "alenaholligan", "davemcfarland"];
// // `process` is a global object that allows access to arguments passed in to the command line
// // const users = process.argv.slice(2);

// // users.forEach (username => {
// //     getProfile(username);
// // });

// users.forEach(profile.get);

const https = require('http');

const port = process.env.PORT || 5000;

https.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(port, function() {
  console.log(port);
});

const ID = process.env.S3_ACCESS_KEY_ID;
const SECRET = process.env.S3_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: fileContent
  };

  const promise = s3.upload(params).promise()

  promise.then(
    function(data) {
      console.log(`Photo uploaded successfully: ${data.location}`);
    }, 
    function(error) {
      return console.error("Error uploading photo:", errror.message);
    }
  );
};

uploadFile('sample.png');