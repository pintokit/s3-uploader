require('dotenv').config()

const fs = require('fs')
const AWS = require('aws-sdk')
const express = require('express')
const multer  = require('multer')

const ID = process.env.S3_ACCESS_KEY_ID
const SECRET = process.env.S3_SECRET_ACCESS_KEY
const BUCKET_NAME = process.env.S3_BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const app = express()
const upload = multer({ dest: 'uploads/' })

app.get('/', function(request, response) {
  response.send('<form method="post" enctype="multipart/form-data" action="/">' + '<input name="photoUpload" type="file" accept="image/*">' + '<input type="submit">' + '</form>')
})

app.listen(5000)