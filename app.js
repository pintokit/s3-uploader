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
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits: { fileSize: 20 * 1000 * 1000 } }).single('photoUpload')

app.get('/', function(request, response) {
  response.send('<form method="post" enctype="multipart/form-data" action="/">' + '<input name="photoUpload" type="file" accept="image/*">' + '<input type="submit">' + '</form>')
})

app.post('/', function(request, response) {
  if (!request.file) {
    return response.status(500).send('No file selected')
  } else {
    upload(request, response, function(error) {
      if (error instanceof multer.MulterError) {
        console.error(error.message)
        return response.status(500).send(`${error.message}`)
      } else if (error) {
        console.error(error.message)
        return response.status(500).send(`${error.message}`)
      }
      console.log('File uploaded')
      return response.status(200).send('File uploaded')
    })
  }
})

app.listen(5000)