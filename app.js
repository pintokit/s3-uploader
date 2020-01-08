require('dotenv').config()

const http = require('http');

const port = process.env.PORT || 5000;

http.createServer(function(request, response) {
  if (request.method === 'POST') {
    console.dir(request);
  } else if (request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<form method="post" enctype="multipart/form-data" action="/">' +
      '<input id="photoUpload" type="file" accept="image/*">' +
      '<input type="submit">' +
      '</form>'
    );
  }
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
    (data) => {
       console.log(`Photo uploaded successfully: ${data.Location}`);
  }).catch(
    (reason) => {
      console.error("Error uploading photo:", reason.message);
    }
  );
};