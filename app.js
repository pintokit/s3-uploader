require('dotenv').config()

const AWS = require('aws-sdk')
const express = require('express')
const multer  = require('multer')
const multerS3 = require('multer-s3')

const ID = process.env.S3_ACCESS_KEY_ID
const SECRET = process.env.S3_SECRET_ACCESS_KEY
const BUCKET_NAME = process.env.S3_BUCKET_NAME
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
})

let fileName

const app = express()
const storage = multerS3({
  s3: s3, 
  bucket: BUCKET_NAME,
  key: function (_request, file, setKey) {
    fileName = Date.now().toString() + file.mimetype.replace('image/', '.')
    setKey(null, fileName)
  }
})

const upload = multer({storage: storage, limits: { fileSize: 20 * 1000 * 1000 } }).single('photoUpload')

app.get('/', function(_request, response) {
  response.send('<form method="post" enctype="multipart/form-data" action="/">' + '<input name="photoUpload" type="file" accept="image/*">' + '<input type="submit">' + '</form>')
})

app.get('/image', function (_request, response) {
  response.send('<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image href="https://photo-uploader-dev.s3-us-west-1.amazonaws.com/1578540232146.jpeg" height="200" width="200"></image></svg>')
})

app.post('/', function(request, response) {
  upload(request, response, function(error) {
    if (error instanceof multer.MulterError) {
      console.error(error.message)
      response.status(500).send(`${error.message}`)
    } else if (error) {
      console.error(error.message)
      response.status(500).send(`${error.message}`)
    }
    const fileUrl = `https://${BUCKET_NAME}.s3-us-west-1.amazonaws.com/${fileName}`
    response.status(200).json({assetUrl: fileUrl})
  })
})

app.listen(process.env.PORT || 5000)